import { TimelineDragState } from './timelinedrag';
import { GridRowMouseDownEvent } from 'cmp/grid/grid';
import { RangeDurationChangeEvent, RangeSourceOffsetChangeEvent, RangeDragEvent, RangeDragEndEvent, RangeDragStartEvent } from 'cmp/audiorange/audiorange';

export class BaseState {
    enter(app) {}
    exit(app) {}
    onTimelineDragStart(app) {}
    onTimelineDrag(app, evt) {}
    onTimelineDragEnd(app) {}
    onTimelineMouseEnter(app, evt) {}
    onTimelineMouseLeave(app, evt) {}
    onSegmentDragStart(app, evt: RangeDragStartEvent) {}
    onSegmentDragEnd(app, evt: RangeDragEndEvent) {}
    onSegmentDrag(app, evt: RangeDragEvent) {}
    onSegmentSourceOffsetChange(app, evt: RangeSourceOffsetChangeEvent) {}
    onDocumentKeyDown(app, evt) {}
    onEditorClick(app, evt) {}
    onEditorMouseDown(app, evt) {}
    onEditorMouseMove(app, evt) {}
    onEditorDragOver(app, evt) {}
    onEditorDrop(app, evt) {}
    onDocumentMouseUp(app, evt) {}
    onPlaybackDurationCursorDoubleTap(app, evt) {}
    onPlaybackDurationCursorDrag(app, evt) {}
    onPlayButtonClick(app, evt: MouseEvent) {}
    onStopButtonClick(app, evt) {}
    onDocumentKeyUpEsc(app, evt) {}
    onDocumentKeyUp(app, evt) {}
    onSilenceDetectButtonClick(app, evt) {}
    onSegmentDurationChange(app, evt: RangeDurationChangeEvent) {}
    onEditorMouseLeave(app, evt) {}
    onAudioTrackMouseDown(app, evt: GridRowMouseDownEvent) {}
    onAudioTrackMouseMove(app, evt: MouseEvent, trackId: string) {}
    onSegmentDoubleClick(app, evt) {}
}
