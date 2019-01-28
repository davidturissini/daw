import { LightningElement, wire, track } from 'lwc';
import { fromEvent as observableFromEvent } from 'rxjs';
import { IdleState } from './states/idle';
import { BaseState } from './states/base';
import { wireSymbol, appStore } from 'store/index';
import { Map as ImmutableMap } from 'immutable';
import { AudioTrack } from 'store/audiotrack';
import { EditorState } from 'store/editor/reducer';
import { createRouter } from 'store/route/action';
import { RouterState } from 'store/route/reducer';
import { RouteNames, routeIsActive } from 'store/route';
import { AudioSegmentState } from 'store/audiosegment/reducer';
import { AudioSegment } from 'store/audiosegment';
import { Color } from 'util/color';
import { GridElementRow } from 'cmp/grid/grid';
import { AudioWindowState } from 'store/audiowindow/reducer';
import { createAudioSegment, setAudioSegmentRange } from 'store/audiosegment/action';
import { ProjectState } from 'store/project/reducer';
import { AudioRangeCreatedEvent, AudioRangeChangeEvent, GridClickEvent } from 'cmp/grid/events';
import { Time } from 'util/time';

export default class AppElement extends LightningElement {
    state: BaseState;
    @track cursor: Time | null = null;
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
            project: ['project'],
        }
    })
    storeData: {
        data: {
            segments: AudioSegmentState['items'];
            route: RouterState['route'];
            editor: EditorState;
            audiotracks: ImmutableMap<string, AudioTrack>;
            audiowindow: AudioWindowState['items'];
            project: ProjectState;
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
     * Project
     *
    */
    get projectBpm() {
        return this.storeData.data.project.bpm;
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
     * Track Grid Events
     *
    */
    onTrackGridClick(evt: GridClickEvent) {
        this.cursor = evt.detail.time;
    }

    /*
     *
     * Track Grid Getters
     *
    */
    get trackGridRows(): GridElementRow[] {
        return this.audioTracks.map((audioTrack: AudioTrack, id: string) => {
            return {
                id,
                height: 60,
                ranges: audioTrack.segments.map((segmentId) => {
                    const segment = this.storeData.data.segments.get(segmentId) as AudioSegment;
                    return {
                        itemId: segmentId,
                        range: segment.range,
                        color: audioTrack.color,
                    }
                })
                .toArray()
            } as GridElementRow;
        })
        .toList()
        .toArray();
    }

    /*
     *
     * Playback Control Events
     *
    */
    onPlayButtonClick(evt: MouseEvent) {
        this.state.onPlayButtonClick(this, evt);
    }

    /*
     *
     * Toggle Mode Buttons
     *
    */
    onPerformanceModeButtonClick(evt: MouseEvent) {
        this.state.onPerformanceModeButtonClick(this, evt);
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
    get isHomeRoute() {
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

    get isConcertModeRoute() {
        if (this.route) {
            return routeIsActive(RouteNames.ConcertMode, {});
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
        throw new Error('Not implemented');
    }

    get editorElement() {
        return this.template.querySelector('.editor');
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
