import { Component, OnInit, HostListener } from '@angular/core';
import { ListService } from '../app/services/list.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  animals: any = [];
  searchText: string;
  key: string;
  reverse: boolean;
  mergeAnimals: any = [];
  originalList: any = [];
  startPosition: number = 0;
  endPosition: number = 3;

  constructor(private listService: ListService) {
  }


  ngOnInit() {
    $(function ($) {
      var cardsList = $('#draggableCards');
      cardsList.sortable({
        handle: '.card-header',
        update: function () {
          $('.card', cardsList).each(function (index, elem) {
            var $listItem = $(elem),
              newIndex = $listItem.index();
          });
        }
      });
    });
    this.list();
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    let pageYOffset = event.currentTarget.pageYOffset;
    let innerHeight = event.currentTarget.innerHeight;
    let documentHeight = $(document).height();
    if (pageYOffset + innerHeight >= documentHeight - 67) {
      this.listFormationHelper();
    }
  }

  list() {
    this.listService.list().subscribe(data => {
      if (data.entries) {
        this.animals = data.entries;
        this.originalList = this.animals;
        this.animals = this.animals.slice(this.startPosition, this.endPosition);
      }
    },
      error => {

      });
  }

  listFormationHelper() {
    if (this.animals.length < this.originalList.length) {
      this.startPosition = this.endPosition;
      this.endPosition = this.startPosition + 1;
      this.animals = this.animals.concat(this.originalList.slice(this.startPosition, this.endPosition));
    }
  }

  search() {
    let combinedResults = [];
    this.listService.search(this.searchText).subscribe(data => {
      data.forEach(element => {
        if (element.entries) {
          combinedResults = combinedResults.concat(element.entries);
        }
      });
      this.animals = this.removeDuplicates(combinedResults);
    },
      error => {

      });
  }

  removeDuplicates(arr) {
    var newArr = [];
    arr.forEach(element => {
      var exists = false;
      newArr.forEach(newElement => {
        if (element.API == newElement.API) {
          exists = true;
        }
      });
      if (exists == false && element.API != "") { newArr.push(element); }
    });
    return newArr;
  }

  sort(key) {
    if (key == -1) {
      this.key = 'API';
    }
    else {
      this.key = key;
    }
    this.reverse = !this.reverse;
  }

}
