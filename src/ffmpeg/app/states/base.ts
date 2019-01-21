import { TimelineDragState } from './timelinedrag';

export class BaseState {
    enter(app) {}
    exit(app) {}
    onTimelineDragStart(app) {}
    onTimelineDrag(app, evt) {}
    onTimelineDragEnd(app) {}
    onTimelineMouseEnter(app, evt) {}
    onTimelineMouseLeave(app, evt) {}
    onSegmentDragStart(app) {}
    onSegmentDragEnd(app) {}
    onSegmentDrag(app, evt) {}
    onSegmentSourceOffsetChange(app, evt) {}
    onDocumentKeyDown(app, evt) {}
    onEditorClick(app, evt) {}
    onEditorMouseDown(app, evt) {}
    onEditorMouseMove(app, evt) {}
    onEditorDragOver(app, evt) {}
    onEditorDrop(app, evt) {}
    onDocumentMouseUp(app, evt) {}
    onPlaybackDurationCursorDoubleTap(app, evt) {}
    onPlaybackDurationCursorDrag(app, evt) {}
    onPlayButtonClick(app, evt) {}
    onStopButtonClick(app, evt) {}
    onDocumentKeyUpEsc(app, evt) {}
    onDocumentKeyUp(app, evt) {}
    onSilenceDetectButtonClick(app, evt) {}
    onSegmentDurationChange(app, evt) {}
    onEditorMouseLeave(app, evt) {}
    onAudioTrackMouseDown(app, evt: MouseEvent, trackId: string) {}
}
