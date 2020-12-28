import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('canvas') canvas: ElementRef;
  selectedImg;

  imageUpload(e) {
    let canvas: HTMLCanvasElement = this.canvas.nativeElement;
    let context = canvas.getContext('2d');

    let img1 = new Image();
    let img2 = new Image();

    const image = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      img1.src = reader.result as string;
      //this.selectedImg = reader.result;
    };
    reader.readAsDataURL(image);

    img1.onload = () => {
      canvas.width = img1.width;
      canvas.height = img1.height;
      img2.src = '../assets/img2.png';
    };

    img2.onload = () => {
      context.drawImage(img1, 0, 0);
      context.drawImage(img2, 0, canvas.height - img2.height);

      const imgUrl = canvas.toDataURL('image/jpeg');
      this.selectedImg = imgUrl;

      canvas.toBlob((blob: any) => {
        let file = new File([blob], image.name, { type: 'image/jpeg' });
        console.log(file);
      }, 'image/jpeg');
    };

    console.log(image);
  }
}
