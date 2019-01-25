import { LightningElement, wire, track } from 'lwc';
import { incrementEnd } from '../../wire/editor';
import { fromEvent as observableFromEvent } from 'rxjs';
import { playheadSym } from '../../wire/playhead';
import { highlightSym } from '../../wire/highlight';
import { IdleState } from './states/idle';
import { BaseState } from './states/base';
import { wireSymbol, appStore } from 'store/index';
import { Map as ImmutableMap } from 'immutable';
import { AudioTrack } from 'store/audiotrack';
import { EditorState } from 'store/editor/reducer';
import { pixelToTime } from 'util/geometry';
import { createRouter } from 'store/route/action';
import { RouterState } from 'store/route/reducer';
import { RouteNames } from 'store/route';
import { AudioSegmentState } from 'store/audiosegment/reducer';
import { AudioSegment } from 'store/audiosegment';
import { Color } from 'util/color';
import { GridElementRow, GridAudioWindowCreatedEvent, AudioRangeCreatedEvent, AudioRangeChangeEvent } from 'cmp/grid/grid';
import { generateId } from 'util/uniqueid';
import { AudioWindowState } from 'store/audiowindow/reducer';
import { createAudioSegment, setAudioSegmentRange } from 'store/audiosegment/action';

export default class AppElement extends LightningElement {
    state: BaseState;
    @track audioTrackWindowId: string | null = null;
    constructor() {
        super();
        this.enterState(new IdleState());
    }

    enterState(next: BaseState) {
        if (this.state) {
            this.state.exit(this);
        }
        this.state = next;
        this.state.enter(this);
    }

    @wire(wireSymbol, {
        paths: {
            audiowindow: ['audiowindow', 'items'],
            audiotracks: ['audiotrack', 'items'],
            editor: ['editor'],
            route: ['router', 'route'],
            segments: ['audiosegment', 'items'],
        }
    })
    storeData: {
        data: {
            segments: AudioSegmentState['items'];
            route: RouterState['route'];
            editor: EditorState;
            audiotracks: ImmutableMap<string, AudioTrack>;
            audiowindow: AudioWindowState['items'];
        }
    }

    get editor(): EditorState {
        return this.storeData.data.editor;
    }

    get audioTracks(): ImmutableMap<string, AudioTrack> {
        return this.storeData.data.audiotracks;
    }

    get audioTracksArray() {
       return this.audioTracks.toList().toArray();
    }

    get route() {
        return this.storeData.data.route;
    }

    onTrackSummaryKeyUp(evt) {
        if (evt.which === 8) {
            const trackId = evt.target.getAttribute('data-track-id');
            //deleteTrack(trackId);
        }
    }

    /*
     *
     * Playhead
     *
    */
    @wire(playheadSym, {})
    playhead;

    /*
     *
     * Highlights
     *
    */
    @wire(highlightSym, {})
    highlightData;

    get highlights() {
        return this.highlightData.data.items.toList().toArray();
    }

    /*
     *
     * Track Segment Grid Events
     *
    */
    onTrackSegmentCreated(evt: AudioRangeCreatedEvent) {
        const { id, parentId, range } = evt.detail;
        appStore.dispatch(createAudioSegment(id, parentId, range));
    }

    onTrackSegmentRangeChange(evt: AudioRangeChangeEvent) {
        const { id, range } = evt.detail;
        appStore.dispatch(setAudioSegmentRange(id, range));
    }

    /*
     *
     * Track Segment Events
     *
    */
    onSegmentDoubleClick(evt) {
        this.state.onSegmentDoubleClick(this, evt);
    }

    /*
     *
     * Events
     *
    */
    onSegmentDragStart(evt) {
        this.state.onSegmentDragStart(this, evt);
    }

    onSegmentDragEnd(evt) {
        this.state.onSegmentDragEnd(this, evt);
    }

    onSegmentDrag(evt) {
        this.state.onSegmentDrag(this, evt);
    }

    onSegmentSourceOffsetChange(evt) {
        this.state.onSegmentSourceOffsetChange(this, evt);
    }

    onSegmentDurationChange(evt) {
        this.state.onSegmentDurationChange(this, evt);
    }

    onEditorMouseMove = (evt) => {
        this.state.onEditorMouseMove(this, evt);
    }

    onEditorMouseLeave = (evt) => {
        this.state.onEditorMouseLeave(this, evt);
    }

    onEditorMouseDown(evt) {
        this.state.onEditorMouseDown(this, evt);
    }

    onEditorClick = (evt) => {
        this.state.onEditorClick(this, evt);
    }

    onTimelineDragStart() {
        this.state.onTimelineDragStart(this);
    }

    onTimelineDragEnd() {
        this.state.onTimelineDragEnd(this);
    }

    onTimelineDrag(evt) {
        this.state.onTimelineDrag(this, evt);
    }

    onDragOver = (evt) => {
        this.state.onEditorDragOver(this, evt);
    }

    onDrop = (evt) => {
        this.state.onEditorDrop(this, evt);
    }

    onTimelineMouseEnter = (evt) => {
        this.state.onTimelineMouseEnter(this, evt);
    }

    onTimelineMouseLeave = (evt) => {
        this.state.onTimelineMouseLeave(this, evt);
    }

    onPlaybackDurationCursorDrag(evt) {
       this.state.onPlaybackDurationCursorDrag(this, evt);
    }

    onPlaybackDurationCursorDoubleTap(evt) {
        this.state.onPlaybackDurationCursorDoubleTap(this, evt);
    }

    onPlayButtonClick(evt) {
        this.state.onPlayButtonClick(this, evt);
    }

    onSilenceDetectButtonClick(evt) {
        this.state.onSilenceDetectButtonClick(this, evt);

        // const range = getTracksRange(this.audioTracks.data);
        // highlightSilences(range);
    }

    onStopButtonClick(evt) {
        this.state.onStopButtonClick(this, evt);
    }

    onDocumentKeyUp = (evt) => {
        if (evt.which === 8) {
            this.state.onDocumentKeyUpEsc(this, evt);
        }
        this.state.onDocumentKeyUp(this, evt);
    }

    onGridRowMouseDown(evt) {
        this.state.onAudioTrackMouseDown(this, evt);
    }

    onAudioTrackMouseMove(evt) {
        this.state.onAudioTrackMouseMove(this, evt, evt.target.getAttribute('data-track-id'));
    }


    /*
     *
     * Routing
     *
    */
    get isEditorRoute() {
        if (this.route) {
            return this.route.name === RouteNames.Home;
        }
        return false;
    }

    get isSegmentEditRoute() {
        if (this.route) {
            return this.route.name === RouteNames.SegmentEdit;
        }
        return false;
    }

    /*
     *
     * Template
     *
    */
    get hasFrame() {
        return this.editor.frame.width > 0;
    }

    get hasVirtualCursor() {
        return (
            this.editor && this.editor.virtualCursor !== null &&
            this.timeInWindow(this.editor.virtualCursor)
        );
    }

    get trackRows() {
        return this.audioTracksArray.map((audioTrack) => {
            const ranges = audioTrack.segments.map((segmentId) => {
                const segment = this.storeData.data.segments.get(segmentId) as AudioSegment;
                return {
                    segmentId: segment.id,
                    key: segment.id,
                    data: segment.range,
                };
            })
            .toArray();

            return {
                color: new Color(255, 0, 0),
                trackId: audioTrack.id,
                key: audioTrack.id,
                height: 60,
                ranges,
            };
        });
    }

    get hasPlaybackCursor() {
        return this.playhead.data.currentTime !== null;
    }

    get hasPlaybackDurationCursor() {
        return this.timeInWindow(this.playhead.data.playbackRange.duration);
    }

    timeInWindow(time) {
        if(this.editor) {
            const { visibleRange } = this.editor;
            const { milliseconds: timeMilliseconds } = time;
            const startMilliseconds = visibleRange.start.milliseconds;
            const endMilliseconds = startMilliseconds + visibleRange.duration.milliseconds;
            return (
                timeMilliseconds >= startMilliseconds &&
                timeMilliseconds <= endMilliseconds
            );
        }

        return false;
    }

    get cursorInWindow() {
        if(this.editor) {
            const { cursor } = this.editor;
            return this.timeInWindow(cursor);
        }

        return false;
    }

    handleEditorEndDrag(evt) {
        const { editor } = this;
        const { frame } = editor;
        if (frame) {
            const time = pixelToTime(
                frame,
                editor.visibleRange,
                evt.detail.dx,
            );
            incrementEnd(time);
        }
    }

    get editorElement() {
        return this.template.querySelector('.editor');
    }

    get trackGridRows(): GridElementRow[] {
        return this.audioTracks.map((audioTrack: AudioTrack, id: string) => {
            return {
                id,
                height: 60,
            } as GridElementRow;
        })
        .toList()
        .toArray();
    }

    get trackSegments(): Array<{ segment: AudioSegment, rowIndex: number, color: Color }> {
        return this.audioTracks.toList().reduce((seed: Array<{ segment: AudioSegment, rowIndex: number, color: Color }>, audioTrack: AudioTrack, index: number) => {
            const segments: Array<{ segment: AudioSegment, rowIndex: number, color: Color }> = audioTrack.segments.map((segmentId: string) => {
                return {
                    segment: this.storeData.data.segments.get(segmentId) as AudioSegment,
                    rowIndex: index,
                    color: audioTrack.color,
                };
            })
            .toArray();
            return seed.concat(segments)
        }, []);
    }

    get hasAudioTrackWindowId() {
        return this.audioTrackWindowId !== null;
    }

    get audioTrackWindow() {
        const { audioTrackWindowId } = this;
        if (audioTrackWindowId) {
            return this.storeData.data.audiowindow.get(audioTrackWindowId);
        }
        return null;
    }

    onAudioTrackWindowCreated(evt: GridAudioWindowCreatedEvent) {
        const { windowId } = evt.detail;
        this.audioTrackWindowId = windowId;
    }

    /*
     *
     * Lifecycle
     *
    */
    connectedCallback() {
        appStore.dispatch(createRouter());
        window.history.replaceState(history.state, '', window.location.pathname);
        document.addEventListener('keyup', this.onDocumentKeyUp);

        observableFromEvent(document, 'keydown').subscribe((evt) => {
            this.state.onDocumentKeyDown(this, evt);
        })

        observableFromEvent(document, 'mouseup').subscribe((evt) => {
            this.state.onDocumentMouseUp(this, evt);
        })

        this.addEventListener('dragover', this.onDragOver);
        this.addEventListener('drop', this.onDrop);
    }

    disconnectedCallback() {
        document.removeEventListener('keyup', this.onDocumentKeyUp);
        this.removeEventListener('dragover', this.onDragOver);
        this.removeEventListener('drop', this.onDrop);
    }
}
