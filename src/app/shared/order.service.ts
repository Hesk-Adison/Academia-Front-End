import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData!: Order;
  orderItems: OrderItem[]=[];

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
    return this.http.post(environment.APIurl + '/Order', body);
  }

  getOrderList() {
    return this.http.get(environment.APIurl + '/Order').toPromise();
  }

  getOrderByID(id:number):any {
    return this.http.get(environment.APIurl + '/Order/'+id).toPromise();
  }

  deleteOrder(id:number) {
    return this.http.delete(environment.APIurl + '/Order/'+id).toPromise();
  }

}
