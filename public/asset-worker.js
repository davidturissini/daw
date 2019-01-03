var assetworker = (function (exports) {
    'use strict';

    importScripts('aurora.js');

    let id = 0;

    function generateId() {
        id += 1;
        return id + '';
    }


    const assets = {};

    self.onmessage = function ({ data }) {
        console.log('message', data);

        if (data.type === 'CREATE_ASSET') {
            const assetId = generateId();
            const asset = AV.Asset.fromBuffer(data.payload.arraybuffer);
            asset.start(false);
            assets[assetId] = asset;

            asset.on('data', (buffer) => {
                postMessage({
                    type: 'ASSET_DATA',
                    payload: {
                        assetId,
                        buffer,
                    }
                }, [buffer.buffer]);
            });

            asset.on('end', () => {
                postMessage({
                    type: 'ASSET_END',
                    payload: {
                        assetId,
                    }
                });
            });
        } else if (data.type === 'ASSET_DECODE') {
            const { assetId } = data.payload;
            const asset = assets[assetId];
            asset.decodePacket();
        }
    };

    exports.generateId = generateId;

    return exports;

}({}));
