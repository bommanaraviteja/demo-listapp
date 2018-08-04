LIST APP

Application Overview:

This is a list application which lists the items from the public rest apis.
Technology stack:
Angular 6
Bootstrap
jQuery

Functional Requirements:

Displaying the list of items
Filtering the list using search functionality
Sorting the list according to selected field
Load items on scroll
Rearrangement of the cards
WCAG

Technical Overview:

Displaying the list of items: 
	Calls the public rest apis to get the list of items. By default only 3 items will be loaded. On page scroll, each item will be loaded one by one.

Filtering the list using search functionality: 
	Calls the public rest apis to filter the list of items by passing the search text. Currently the filter functionality 	is limited to only API/Description fields.

Sorting the list according to selected field: 
	Sorts the list by field (API/Description/Category).

Load items on scroll: 
	For better performance only 3 items will loaded by default, on page scroll each item will be loaded one by one.

Rearrangement of the cards: 
	User can rearrange the cards by dragging and dropping the cards.

WCAG: 
	Not covered in this MVP.

Deployment:

Copy the contents inside the deployment folder to tomcat or any server. 
Start the server.

Known issues:

	Sorting is not working as expected during the page scroll. But working as expected once items are fully loaded.

Note: Sort the items once they are loaded completely. 
