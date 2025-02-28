import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    public download(filename: string, blob: Blob) {
        const anchor = window.document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(anchor.href);
    }


}
