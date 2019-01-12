import { BaseState } from './base';
import { HasSelectionState } from './hasselection';
import { IdleState } from './idle';

import { AudioRange, clamp as clampAudioRange } from './../../../util/audiorange';
import { stream as editorStream } from './../../../wire/editor';
import {
    stream as audioTracksStream,
    segmentInTimeRange,
    setSegmentSelection,
    getSelectedAudioTracks,
} from './../../../wire/audiotrack';
import { take } from 'rxjs/operators';
import { combineLatest as observableCombineLatest } from 'rxjs';
import { setSelectionFrame, clearSelectionFrame } from './../../../wire/selection';

export class SelectState extends BaseState {
    constructor(initialLeft, initialTop) {
        super();
        if (typeof initialLeft !== 'number') {
            throw new TypeError(`Cannot create SelectState. "${initialLeft}" is not a valid value for initial left.`);
        }
        if (typeof initialTop !== 'number') {
            throw new TypeError(`Cannot create SelectState. "${initialTop}" is not a valid value for initial top.`);
        }

        this.initialLeft = initialLeft;
        this.initialTop = initialTop;
        this.selectionFrame = {
            width: 0,
            height: 0,
            top: initialTop,
            left: initialLeft,
        };
    }

    enter(app) {
        const elm = app.editorElement;
        const rect = elm.getBoundingClientRect();
        this.offsetX = rect.x;
        this.offsetY = rect.y;

    }
    exit(app) {
        const frame = this.selectionFrame;
        clearSelectionFrame();

        observableCombineLatest(
            editorStream,
            audioTracksStream,
            (editor, audioTracks) => {
                return { editor, audioTracks };
            },
        )
        .pipe(
            take(1)
        )
        .subscribe(({ editor, audioTracks }) => {
            const startTime = editor.absolutePixelToTime(frame.left);
            const duration = editor.pixelToTime(frame.width);
            const range = new AudioRange(startTime, duration);
            const frameBottom = frame.top + frame.height;
            audioTracks.filter((audioTrack) => {
                const { frame: audioTrackFrame } = audioTrack;
                const bottom = audioTrackFrame.top + audioTrackFrame.height;
                const midHeight = audioTrackFrame.height / 2;
                return (
                    frame.top <= (audioTrackFrame.top + midHeight) &&
                    frameBottom >= (bottom - midHeight)
                );
            })
            .forEach((audioTrack) => {
                audioTrack.segments.filter((segment) => {
                    return segmentInTimeRange(
                        segment,
                        range.start,
                        range.duration,
                    );
                })
                .forEach((segment) => {
                    const clamped = clampAudioRange(
                        new AudioRange(segment.offset, segment.duration),
                        range,
                    );

                    setSegmentSelection(audioTrack.id, segment.id, clamped);
                })
            });
        })
    }

    onDocumentMouseUp(app, evt) {
        const { selectionFrame: frame } = this;

        const selectedTracks = getSelectedAudioTracks(frame);
        if (selectedTracks.size === 0) {
            app.enterState(new IdleState());
            return;
        }


        editorStream.pipe(take(1)).subscribe((editor) => {
            const start = editor.absolutePixelToTime(frame.left);
            const duration = editor.pixelToTime(frame.width);
            const range = new AudioRange(start, duration);
            app.enterState(new HasSelectionState(range));
        });
    }

    onEditorMouseMove(app, evt) {
        const { offsetX, offsetY, initialLeft, initialTop } = this;
        const frame = {
            width: (evt.x - offsetX) - initialLeft,
            height: (evt.y - offsetY) - initialTop,
            top: initialTop,
            left: initialLeft,
        };

        if (frame.height < 0) {
            frame.top += frame.height;
            frame.height = -frame.height;
        }

        if (frame.width < 0) {
            frame.left += frame.width;
            frame.width = -frame.width;
        }

        this.selectionFrame = frame;
        setSelectionFrame(frame);
    }
}
