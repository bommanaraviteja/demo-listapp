import { Component, OnInit, HostListener } from '@angular/core';
import { ListService } from '../app/services/list.service';
declare var $: any;

/*
The Appcomponent class
* loads the list of animals 
* filters the list by search
* sorts the list by fields
* loads the list on scroll
* reorders the list of cards
*/
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
  listError: string = null;
  searchError: string = null;

  constructor(private listService: ListService) {
  }


  ngOnInit() {
    //Function to rearrange the cards
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

    //loads the list on page load. By default it loads only 3 items.
    this.list();
  }

  //Detects the on scroll event
  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    let pageYOffset = event.currentTarget.pageYOffset;
    let innerHeight = event.currentTarget.innerHeight;
    let documentHeight = $(document).height();
    if (pageYOffset + innerHeight >= documentHeight - 67) {
      this.listFormationHelper();
    }
  }

  //Gets the list of animals from the rest api and maps to model object
  //By default it loads only 3 items, on page scroll, it loads items one by one
  list() {
    this.reset()
    this.listService.list().subscribe(data => {
      if (data.entries) {
        this.animals = data.entries;
        this.originalList = this.animals;
        this.animals = this.animals.slice(this.startPosition, this.endPosition);
      }
    },
      error => {
        this.listError = "Something went wrong. Please try again after sometime."
      });
  }

  //Helper method to load items on scrolling
  //By default it loads 3 items, on page scroll, each item will be loaded one by one
  listFormationHelper() {
    if (this.animals.length < this.originalList.length) {
      this.startPosition = this.endPosition;
      this.endPosition = this.startPosition + 1;
      this.animals = this.animals.concat(this.originalList.slice(this.startPosition, this.endPosition));
    }
  }

  //Filters the list by passing the search text to rest call
  //current search applies to only API/Description
  search() {
    let combinedResults = [];
    this.reset();
    this.listService.search(this.searchText).subscribe(data => {
      data.forEach(element => {
        if (element.entries) {
          combinedResults = combinedResults.concat(element.entries);
        }
      });
      this.animals = this.removeDuplicates(combinedResults);
    },
      error => {
        this.searchError = "Something went wrong. Please try again after sometime.";
      });
  }

  //Helper method to remove duplicates from the search results
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

  //Sorts the list by fields (API, Description, Category)
  sort(key) {
    if (key == -1) {
      this.key = 'API';
    }
    else {
      this.key = key;
    }
    this.reverse = !this.reverse;
  }

  //Clears the error messages
  reset() {
    this.listError = null;
    this.searchError = null;
  }

}
