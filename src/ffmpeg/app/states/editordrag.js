import { BaseState } from './base';
import {
    stream as editorStream,
    setVirtualCursorTime,
} from './../../../wire/editor';
import { IdleState } from './idle';
import { generateId } from './../../../util/uniqueid'
import { take } from 'rxjs/operators';
import {
    createTrackAndSourceFile,
} from './../../../wire/audiotrack';

export class EditorDragState extends BaseState {
    enter() {
        console.log('enter')
    }
    onEditorDragOver(app, evt) {
        evt.preventDefault();
        editorStream.pipe(take(1)).subscribe((editor) => {
            const { offsetX } = evt;
            const time = editor.pixelToTime(offsetX - editor.frame.left);
            const next = time.add(editor.visibleRange.start);
            setVirtualCursorTime(next);
        });
    }

    onEditorDrop(app, evt) {
        evt.preventDefault();
        editorStream.pipe(take(1)).subscribe((editor) => {
            const { files } = evt.dataTransfer;
            for(let i = 0, len = files.length; i < len; i += 1) {
                const sourceId = generateId();
                const trackId = generateId();
                const time = editor.absolutePixelToTime(evt.offsetX - editor.frame.left);
                createTrackAndSourceFile(
                    trackId,
                    sourceId,
                    files[i],
                    time,
                );
            }
            console.log('drop');
            app.enterState(new IdleState());
        });
    }
}
