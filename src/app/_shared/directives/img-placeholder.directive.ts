import { Directive, Input } from '@angular/core';
import { GLOBAL } from '@global/globals';

@Directive({
  selector: 'img[src]',
  host: {
    '[src]': 'checkPath(src)',
    '(error)': 'onError()'
  }
})
export class ImgPlaceholderDirective {
  @Input() src: string = '';
  public defaultImg: string = GLOBAL.DEFAULT_IMG;
  public onError() {
    this.src = this.defaultImg;
  }
  public checkPath(src: any) {
    return src && src != '' ? src : this.defaultImg;
  }
}
