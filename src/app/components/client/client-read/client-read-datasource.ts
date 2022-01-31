import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

// TODO: replace this with real data from your application
const DATA: Client[] = [];

const EXAMPLE_DATA: Client[] = [
  {id: 1, name: 'Hydrogen', age: 0},
  {id: 2, name: 'Helium', age: 0},
  {id: 3, name: 'Lithium', age: 0},
  {id: 4, name: 'Beryllium', age: 0},
  {id: 5, name: 'Boron', age: 0},
  {id: 6, name: 'Carbon', age: 0},
  {id: 7, name: 'Nitrogen', age: 0},
  {id: 8, name: 'Oxygen', age: 0},
  {id: 9, name: 'Fluorine', age: 0},
  {id: 10, name: 'Neon', age: 0},
  {id: 11, name: 'Sodium', age: 0},
  {id: 12, name: 'Magnesium', age: 0},
  {id: 13, name: 'Aluminum', age: 0},
  {id: 14, name: 'Silicon', age: 0},
  {id: 15, name: 'Phosphorus', age: 0},
  {id: 16, name: 'Sulfur', age: 0},
  {id: 17, name: 'Chlorine', age: 0},
  {id: 18, name: 'Argon', age: 0},
  {id: 19, name: 'Potassium', age: 0},
  {id: 20, name: 'Calcium', age: 0},
];

/**
 * Data source for the ClientRead view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ClientReadDataSource extends DataSource<Client> {
  data = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /*ngOnInit(): void {
    this.clientService.read().subscribe(clients => {
      this.clients = clients;
      console.log(this.clients);
    });
  }*/

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Client[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Client[]): Client[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Client[]): Client[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
