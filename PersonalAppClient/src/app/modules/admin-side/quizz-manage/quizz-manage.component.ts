import { Component, OnInit } from '@angular/core';
import { MasterDataService } from 'src/services/master-data.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-quizz-manage',
  templateUrl: './quizz-manage.component.html',
  styleUrls: ['./quizz-manage.component.scss']
})
export class QuizzManageComponent implements OnInit {

  selectedFile : any;
  openFormCreateQuizz: boolean = false;
  constructor(
    private service : MasterDataService
  ) { }

  ngOnInit(): void {
  }

  createQuizz(){
    this.openFormCreateQuizz = true;
  }

  backFromCreateForm(event : any){
    this.openFormCreateQuizz = event;
  }

  processFile(imageInput : any){
    if (imageInput.length === 0) {
      return;
    }
    const file: File = imageInput.files[0];


    //Convert bytes to Mb
    const sizeFileMb = file.size / Math.pow(1024,2);
    if(sizeFileMb > 4){
      console.log('File quá lớn');
      return;
    }
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.service.test(formData).subscribe((result) => {
      console.log(result);

    })
  }

}
