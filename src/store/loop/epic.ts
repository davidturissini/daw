import { CREATE_INSTRUMENT } from "store/instrument/const";
import { map } from "rxjs/operators";
import { CreateInstrumentAction } from "store/instrument/action";
import { generateId } from "util/uniqueid";
import { createLoop } from "./action";

export function createInstrumentEpic(actions) {
    return actions.ofType(CREATE_INSTRUMENT)
        .pipe(
            map((action: CreateInstrumentAction<any>) => {
                const { type, id } = action.payload;
                const loopId= generateId();

                return createLoop(id, loopId, type);
            })
        )
}
