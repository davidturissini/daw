import { LightningElement, api, wire } from 'lwc';
import { wireSymbol, appStore } from 'store/index';
import { Instrument } from 'store/instrument';
import { LoopState } from 'store/loop/reducer';
import { navigate } from 'store/route/action';
import { RouteNames } from 'store/route';
import { DeleteInstrumentEvent, deleteInstrumentEvent } from 'event/deleteinstrumentevent';
import { RouterState } from 'store/route/reducer';
import { Tempo } from 'store/project';
import { VolumeMeterOrientation } from 'cmp/volumemeter/volumemeter';
import { instrumentMeters } from 'audio/instruments';

export type CreateLoopEvent = CustomEvent<{
    instrumentId: string;
}>

export default class TrackLoopsElement extends LightningElement {
    @api instrument: Instrument<any>;
    @api active: boolean;
    @api tempo: Tempo;

    @wire(wireSymbol, {
        paths: {
            loop: ['loop', 'items'],
            router: ['router'],
        }
    })
    storeData: {
        data: {
            router: RouterState;
            loop: LoopState['items']
        }
    }

    get containerClassName() {
        if (this.active) {
            return 'loops active';
        }
        return 'loops';
    }

    get loops() {
        const { loop: loopItems } = this.storeData.data;
        return this.instrument.loops.map((loopId) => {
            return loopItems.get(loopId);
        }).filter((loop) => loop !== undefined);
    }

    get volumeMeterOrientation() {
        return VolumeMeterOrientation.Vertical;
    }

    get instrumentMeter() {
        return instrumentMeters[this.instrument.id];
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

    onContainerFocus() {
        const { route } = this.storeData.data.router;
        if (route && route.params.instrument_id === this.instrument.id) {
            return;
        }
        appStore.dispatch(
            navigate(RouteNames.InstrumentEdit, {
                instrument_id: this.instrument.id,
            })
        )
    }

    onContainerKeyUp(evt: KeyboardEvent) {
        if (evt.which === 8 && evt.target === evt.currentTarget) {
            const event: DeleteInstrumentEvent = deleteInstrumentEvent(this.instrument.id);
            this.dispatchEvent(event);
        }
    }
}
