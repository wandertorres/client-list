import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-crud',
  templateUrl: './client-crud.component.html',
  styleUrls: ['./client-crud.component.scss']
})
export class ClientCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToClientCreate(): void {
    this.router.navigate(['/clients/create']);
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }

}
