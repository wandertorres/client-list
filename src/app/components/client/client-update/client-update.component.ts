import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    name: '',
    age: 0,
    city: ''
  };

  clientForm = new FormGroup({
    age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required])
  });

  constructor(
    private clientService: ClientService, 
    private router: Router, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.clientService.read().subscribe((client) => {
      this.client = client[id-1];
    })

    /* Trecho de código de como seria abusca do client a ser editado
    caso a API permitisse um GET passando o id como parametro.
    
    const id: string | null = this.route.snapshot.paramMap.get('id');
    this.clientService.readById(id).subscribe(client => {
      this.client = client;
    });*/
  }

  updateClient() {
    this.clientService.update(this.client).subscribe(() => {
      this.clientService.showMessage(`Cliente ${this.client.name} atualizado!`);
      this.router.navigate(['/clients']);
    })
  }

  cancel(): void {
    this.router.navigate(['/clients']);
  }
}
