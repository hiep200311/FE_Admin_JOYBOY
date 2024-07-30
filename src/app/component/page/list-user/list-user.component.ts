import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(response => {
      if (response.status === 'OK') {
        this.users = response.data.users;
      }
    }, error => {
      console.error('Error fetching users:', error);
    });
  }

 
  formatDate(dateArray: number[]): string {
    const [year, month, day, hour, minute, second, millisecond] = [
      dateArray[0] || 0,
      dateArray[1] - 1 || 0, // Tháng bắt đầu từ 0 trong JavaScript Date
      dateArray[2] || 0,
      dateArray[3] || 0,
      dateArray[4] || 0,
      dateArray[5] || 0,
      dateArray[6] || 0,
    ];
    const date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
    return date.toLocaleDateString('en-GB'); // Format ngày tháng theo định dạng dd/MM/yyyy
  }
}