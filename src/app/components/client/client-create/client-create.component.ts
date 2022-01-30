import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  constructor(private clientService: ClientService,
    private router: Router) { }

  ngOnInit(): void { }

  createClient(): void {
    this.clientService.showMessage('Cliente cadastrado');
  }

  cancel(): void {
    this.router.navigate(['/clients']);
  }
}
