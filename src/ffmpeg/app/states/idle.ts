import { TimelineDragState } from './timelinedrag';
import { BaseState } from './base';
import { MetaKeyDownState } from './metakeydown';
import { SegmentDragState } from './segmentdrag';
import { EditorDragState } from './editordrag';
import { PlayingState } from './playing';
import { HighlightSilencesState } from './highlightsilences';
import {
    getTracksDuration,
    stream as audioTracksStream,
    getTracksRange,
} from './../../../wire/audiotrack';
import {
    setSegmentDuration,
    moveSegmentSourceOffset,
} from './../../../wire/audiotracksegment';
import {
    stream as editorStream,
} from './../../../wire/editor';
import { take } from 'rxjs/operators';
import {
    stream as playheadStream,
    setPlaybackDuration,
    incrementPlaybackDuration,
} from './../../../wire/playhead';
import { zip } from 'rxjs';
import { AudioRange } from '../../../util/audiorange';
import { appStore } from 'store/index';
import { setVirtualCursorTime, setCursorTime } from 'store/editor/action';
import { pixelToTime, absolutePixelToTime } from 'util/geometry';
import { SegmentDrawState } from './segmentdraw';
import { SegmentDoubleClickEvent } from './../../audiotracksegment/audiotracksegment';
import { navigate } from 'store/route/action';
import { RouteNames, SegmentEditRouteParams } from 'store/route';

export class IdleState extends BaseState {
    onDocumentKeyDown(app, evt) {
        if (evt.key === 'Meta') {
            app.enterState(new MetaKeyDownState());
        } else if (evt.key === 'Alt') {
            app.enterState(new SegmentDrawState());
        }
    }

    onTimelineDragStart(app) {
        app.enterState(new TimelineDragState());
    }

    onSegmentDragStart(app) {
        app.enterState(new SegmentDragState());
    }

    onSegmentSourceOffsetChange(app, evt) {
        const { time, segmentId } = evt.detail;
        moveSegmentSourceOffset(
            segmentId,
            time,
        );
    }

    onEditorMouseMove(app, evt) {
        const { editor } = appStore.getState()
        const { offsetX } = evt;
        const time = pixelToTime(editor.frame, editor.visibleRange, offsetX);
        const next = time.add(editor.visibleRange.start);
        appStore.dispatch(setVirtualCursorTime(next));
    }

    onEditorMouseLeave(app, evt) {
        appStore.dispatch(setVirtualCursorTime(null));
    }

    onSegmentDurationChange(app, evt) {
        const { time, segmentId } = evt.detail;
        setSegmentDuration(
            segmentId,
            time,
        );
    }

    onEditorClick(app, evt) {
        const { editor } = appStore.getState();
        const next = absolutePixelToTime(editor.frame, editor.visibleRange, evt.offsetX);
        appStore.dispatch(setCursorTime(next));
    }

    onEditorDragOver(app, evt) {
        evt.preventDefault();
        app.enterState(new EditorDragState())
    }

    onTimelineMouseEnter(app, evt) {
        app.template.host.classList.add('editor--draggable');
    }

    onTimelineMouseLeave(app, evt) {
        app.template.host.classList.remove('editor--draggable');
    }

    onPlaybackDurationCursorDoubleTap(app, evt) {
        zip(
            playheadStream,
            audioTracksStream,
        )
        .pipe(take(1)).subscribe(([playhead, audioTracks]) => {
            const duration = getTracksDuration(audioTracks);
            if (duration.greaterThan(playhead.playbackRange.duration)) {
                setPlaybackDuration(duration);
            }
        });
    }

    onPlaybackDurationCursorDrag(app, evt) {
        editorStream.pipe(take(1)).subscribe((editor) => {
            const { dx } = evt.detail;
            const time = editor.pixelToTime(dx);
            incrementPlaybackDuration(time);
        });
    }

    onPlayButtonClick(app, evt) {
        const { editor } = appStore.getState();
        const range = new AudioRange(editor.cursor, editor.duration);
        app.enterState(new PlayingState(range));
    }

    onSilenceDetectButtonClick(app, evt) {
        audioTracksStream.pipe(take(1)).subscribe((audioTracks) => {
            const range = getTracksRange(audioTracks);
            app.enterState(new HighlightSilencesState(range));
        });
    }

    onSegmentDoubleClick(app, evt: SegmentDoubleClickEvent) {
        const { segmentId } = evt.detail;
        const path = `/segments/${segmentId}/edit`;
        appStore.dispatch(
            navigate<SegmentEditRouteParams>(RouteNames.SegmentEdit, {
                segment_id: segmentId,
            })
        )
        window.history.pushState({ hello: 'world' }, 'foo', path);
    }
}
