export class LectureModelHTML {
  name:string = '';
  titles: Title[] = [];
  pages: Page[] = [
    // {value:1, get label ():string {return 'Page '+ this.value.toString()}, html:''},
    {value:1, label:'Page 1', html:''},
  ];
  page_backup: Page[] = [
    // {value:1, get label ():string {return 'Page '+ this.value.toString()}, html:''},
    {value:1, label:'Page 1', html:''},
  ];


  public addPage():number {
    let lastPage = this.pages.length;
    this.pages.push({value:lastPage+1, label: 'Page '+ (lastPage+1).toString(), html: ''})
    return lastPage + 1;
  }

  public delPage(pageNum:number, callback) {
    // let currentIndex = this.pages.indexOf(page)
    let index:number = pageNum-1;
    if(this.pages.length !== 1) {
      this.pages.splice(index, 1);
      this.remap(this.pages);
      callback(pageNum);
    }
  }

  public insertPage(pageNum:number) {
    this.pages.push({value:pageNum+1, label: 'Page '+ (pageNum+1).toString(), html: ''})
    this.remap(this.pages);
    return pageNum + 1;
  }

  public remap(pages:Page[]) {
    let newPage = 0
    pages.map((obj)=>{
      newPage++;
      obj.value = newPage;
      obj.label = 'Page ' + newPage;
    })
  }
}

export class LectureModelPDF {
  name:string = '';
  file:string = '';
}

interface Page {
  value:number;
  label:string;
  html:string;
}

interface Title {
  value:string;
  id:number;
  label:string;
}
