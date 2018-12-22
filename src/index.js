import { createElement, register } from 'lwc';
import { registerWireService } from 'wire-service';
import App from './ffmpeg/app/app';

registerWireService(register);

const elm = createElement('ffmpeg-app', {
    is: App,
    fallback: false,
});
document.body.appendChild(elm);
