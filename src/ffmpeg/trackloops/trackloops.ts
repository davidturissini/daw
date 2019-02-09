import { LightningElement, api, wire } from 'lwc';
import { wireSymbol, appStore } from 'store/index';
import { Instrument } from 'store/instrument';
import { LoopState } from 'store/loop/reducer';
import { Loop } from 'store/loop';
import { navigate } from 'store/route/action';
import { RouteNames } from 'store/route';

export type CreateLoopEvent = CustomEvent<{
    instrumentId: string;
}>

export default class TrackLoopsElement extends LightningElement {
    @api instrument: Instrument<any>;

    @wire(wireSymbol, {
        paths: {
            loop: ['loop', 'items']
        }
    })
    storeData: {
        data: {
            loop: LoopState['items']
        }
    }

    get loops() {
        const { loop: loopItems } = this.storeData.data;
        return this.instrument.loops.map((loopId) => {
            return loopItems.get(loopId) as Loop;
        })
    }

    onCreateTrackLoopClick(evt) {
        const event: CreateLoopEvent = new CustomEvent('createtrackloop', {
            bubbles: true,
            composed: true,
            detail: {
                instrumentId: this.instrument.id,
            }
        });

        this.dispatchEvent(event);
    }

    onTitleFocus() {
        appStore.dispatch(
            navigate(RouteNames.InstrumentEdit, {
                instrument_id: this.instrument.id,
            })
        )
    }
}
