
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CatagoryService } from '../../../service/catagory/catagory.service';
import { BrandService } from '../../../service/brand/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAllProductService } from '../../../service/getAllProduct/get-all-product.service';
import { AdminService } from '../../../service/admin/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  categories: any[] = [];
  brands: any[] = [];
  productForm: FormGroup;
  products: any[] = [];
  selectedFiles: any[] = []; // To store selected files and their URLs
  selectedProductId: number | null = null; // Added property to store selected product ID


  constructor(
    private categoryService: CatagoryService,
    private brandService: BrandService,
    private fb: FormBuilder,
    private getAllProductService: GetAllProductService,
    private adminService: AdminService
  ) { 
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      discount_price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllCatagory();
    this.getAllBrand();
    this.getAllProduct();
  }

  getAllCatagory(){
    this.categoryService.getCategories().subscribe(response => {
      if (response.status === 'OK') {
        this.categories = response.data.categories;
      }
    });
  }

  getAllProduct(){
    this.getAllProductService.getAllProducts().subscribe(response => {
      if (response.status === 'OK') {
        this.products = response.data.products;
      }
    });
  }

  getAllBrand(){
    this.brandService.getAllBrands().subscribe(response => {
      if (response.status === 'OK') {
        this.brands = response.data.brands;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.getAllProductService.addProduct(this.productForm.value).subscribe(response => {
        if (response.status === 'CREATED') {
          alert('Tạo sản phẩm thành công');
          this.productForm.reset();
          this.getAllCatagory();
          this.getAllBrand();
        } else {
          alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
      }, error => {
        console.error('Error creating product:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }

  onProductSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedProductId = Number(selectElement.value);
  }

  onFilesSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    const thumbnailsElement = document.querySelector('#thumbnailsContainer') as HTMLDivElement;

    if (files) {
      if (thumbnailsElement) {
        thumbnailsElement.innerHTML = ''; // Clear current thumbnails

        Array.from(files).forEach((file: File) => { // Explicitly typing file as File
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            const img = document.createElement('img');
            img.src = e.target?.result as string;

            // Set fixed size for image
            img.style.width = '150px';  // Set width
            img.style.height = '150px'; // Set height
            img.style.objectFit = 'cover'; // Maintain aspect ratio, cover the box

            thumbnail.appendChild(img);

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            removeButton.textContent = 'x';
            removeButton.addEventListener('click', () => {
              thumbnail.remove();
            });

            thumbnail.appendChild(removeButton);
            thumbnailsElement.appendChild(thumbnail);
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }

  uploadImages(): void {
    const fileInput = document.querySelector('#product-images') as HTMLInputElement;
    const files = fileInput?.files;

    if (!files || files.length === 0) {
      alert('Please select some files.');
      return;
    }

    if (this.selectedProductId === null) {
      alert('Please select a product.');
      return;
    }

    this.adminService.uploadImages(this.selectedProductId, Array.from(files)).subscribe({
      next: (response) => {
        // Check if the response has status CREATED (201)
        if (response.status === 'CREATED') {
          alert('Images uploaded successfully!');
          fileInput.value = '';
          this.selectedFiles = [];
          this.getAllProduct();

          const thumbnailsElement = document.querySelector('#thumbnailsContainer') as HTMLDivElement;
          if (thumbnailsElement) {
            thumbnailsElement.innerHTML = '';
          }
   
          
        } else {
          alert('Upload successful but with unexpected status.');
        }

        // Clear file input and selected files
        fileInput.value = '';
      },
      error: (error) => {
        console.error('Error uploading images:', error);
        alert('Failed to upload images.');
      }
    });
  }
}