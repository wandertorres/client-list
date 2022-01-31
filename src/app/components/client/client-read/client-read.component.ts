import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { ClientReadDataSource } from './client-read-datasource';

@Component({
  selector: 'app-client-read',
  templateUrl: './client-read.component.html',
  styleUrls: ['./client-read.component.scss']
})
export class ClientReadComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Client>;
  dataSource: ClientReadDataSource;
  clientService!: ClientService;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'age'];

  constructor() {
    this.dataSource = new ClientReadDataSource();
   }

  /*ngOnInit(): void {
    this.clientService.read().subscribe(clients => {
      this.dataSource.data = clients;
      console.log(this.dataSource.data);
    });
  }*/

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
