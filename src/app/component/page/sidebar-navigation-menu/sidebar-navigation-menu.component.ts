import { Component, OnInit, AfterViewInit } from '@angular/core';
import { JwtService } from '../../../service/jwt/jwt.service';
import { AuthuServiceService } from '../../../service/authService/authu-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar-navigation-menu',
  templateUrl: './sidebar-navigation-menu.component.html',
  styleUrl: './sidebar-navigation-menu.component.css'
})
export class SidebarNavigationMenuComponent  implements OnInit, AfterViewInit {
  userName: string = '';
  constructor(private jwtService : JwtService,
    private authuServiceService: AuthuServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    const token = sessionStorage.getItem('token'); // Adjust the key as needed
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      this.userName = decodedToken?.sub || 'Unknown User'; // Use 'sub' for user name
    }
  }

  ngAfterViewInit(): void {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const arrows = document.querySelectorAll(".arrow");
    arrows.forEach((arrow: Element) => {
      arrow.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLElement;
        const arrowParent = target.parentElement?.parentElement; 
        if (arrowParent) {
          arrowParent.classList.toggle("showMenu");
        }
      });
    });

    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".bx-menu");
    if (sidebarBtn && sidebar) {
      sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
      });
    }
  }

  logout() {
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    if (token) {
      this.authuServiceService.logout(token).subscribe(
        response => {
          if (response.message === 'Logout successful') {
            sessionStorage.removeItem('token'); // Xóa token khỏi session storage
            this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập hoặc trang khác
          }
        },
        error => {
          console.error('Logout failed', error);
          // Xử lý lỗi phù hợp trong ứng dụng của bạn
        }
      );
    }
  }
}
