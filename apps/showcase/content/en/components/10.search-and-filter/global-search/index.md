---
title: Global search
status: new
---

The global search is used to provide a application-wide search functionality to e.g. quickly find a wide variety of data. While it can be triggered / opened using any custom component or logic, it is commonly placed as search button inside the [nav bar](/components/navigation/nav-bar) component.

## Examples

### Basic

This example simulates asynchronous data loading after a search term is entered. When not searched, project or user specific suggestions can be displayed if needed.

<<< ./examples/Basic.example.vue preview=true layout=fullWidth

### Show all results

When working with many search results, you can also use a "Show all results" button to either navigate to a dedicated search results page or to load more results.

<<< ./examples/ShowAll.example.vue preview=true layout=fullWidth
