import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {
  client: Client = {
    id: 0,
    name: 'Wander',
    age: 0,
    city: 'Sev'
  };

  constructor(
    private clientService: ClientService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.clientService.read().subscribe((client) => {
      this.client = client[id];
    })
    /*const id: string | null = this.route.snapshot.paramMap.get('id');
    this.clientService.readById(id).subscribe(client => {
      this.client = client;
    });*/
  }

  updateClient(): void {
    this.clientService.update(this.client).subscribe(() =>{
      this.clientService.showMessage(`Cliente ${this.client.name} atualizado!`);
      this.router.navigate(['/clients']);
    })
  }

  cancel(): void {
    this.router.navigate(['/clients']);
  }

}
