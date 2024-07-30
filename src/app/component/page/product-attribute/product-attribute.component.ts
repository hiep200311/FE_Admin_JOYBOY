import { Component, OnInit } from '@angular/core';
import { AttributeService } from '../../../service/attribute/attribute.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAllProductService } from '../../../service/getAllProduct/get-all-product.service';
@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrl: './product-attribute.component.css'
})
export class ProductAttributeComponent implements OnInit{
  attributes: any[] = [];
  attributeForm: FormGroup;
  productAttribute: FormGroup;
  products: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private attributeService: AttributeService,
    private fb: FormBuilder,
    private getAllProductService: GetAllProductService
  ) { 
    this.attributeForm = this.fb.group({
      productId: ['', Validators.required],
      attributeOptionId: ['', Validators.required],
      price: ['', [Validators.required]],
      discountPrice: ['', [Validators.required, ]]
    });

    this.productAttribute = this.fb.group({
      productId: ['', Validators.required],
      attributeOptionId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllAttributes();
    this.getAllProduct();
  }

  getAllProduct(){
    this.getAllProductService.getAllProducts().subscribe(response => {
      if (response.status === 'OK') {
        this.products = response.data.products;
      }
    });
  }

  getAllAttributes(): void {
    this.attributeService.getAllAttributeOptions().subscribe(response => {
      if (response.status === 'OK') {
        this.attributes = response.data.attributeOptions;
      }
    });
  }


  onSubmit1(): void {
    if (this.productAttribute.valid && this.selectedFile) {
      const formValue = this.productAttribute.value;
      const productId = formValue.productId;
      const attributeOptionId = formValue.attributeOptionId;

      // Ensure that all required arguments are provided
      if (productId && attributeOptionId && this.selectedFile) {
        this.attributeService.uploadImageProductAttribute(productId, attributeOptionId, this.selectedFile).subscribe(
          (response: any) => {
            if (response.status === 'CREATED') {
              alert('Tạo thuộc tính sản phẩm thành công');
              this.productAttribute.reset();
              this.selectedFile = null;
              this.getAllAttributes(); // Refresh the list
            } else {
              alert('Có lỗi xảy ra. Vui lòng thử lại.');
            }
          },
          (error: any) => {
            console.error('Error uploading image for product attribute:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
          }
        );
      } else {
        alert('Vui lòng điền đầy đủ thông tin và chọn ảnh');
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin và chọn ảnh');
    }
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



  onSubmit(): void {
    if (this.attributeForm.valid) {
      const formValue = this.attributeForm.value;
      const productAttribute = {
        product_id: formValue.productId,
        attribute_option_id: [formValue.attributeOptionId],
        price: formValue.price,
        discount_price: formValue.discountPrice
      };

      this.attributeService.addProductAttribute(productAttribute).subscribe(
        (response: any) => {
          if (response.status === 'CREATED') {
            alert('Tạo thuộc tính sản phẩm thành công');
            this.attributeForm.reset();
            this.getAllAttributes(); 
            this.getAllProduct();
          } else {
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
          }
        },
        (error: any) => {
          console.error('Error creating product attribute:', error);
          alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
      );
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }



  formatDate(date: string): string {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }
}
