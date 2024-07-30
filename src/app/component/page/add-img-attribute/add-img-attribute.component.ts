import { Component, OnInit } from '@angular/core';
import { AttributeService } from '../../../service/attribute/attribute.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAllProductService } from '../../../service/getAllProduct/get-all-product.service';

@Component({
  selector: 'app-add-img-attribute',
  templateUrl: './add-img-attribute.component.html',
  styleUrl: './add-img-attribute.component.css'
})
export class AddImgAttributeComponent implements OnInit{
  attributes: any[] = [];
  productAttribute: FormGroup;
  products: any[] = [];
  selectedFile: File | null = null;
  selectedProductId: number | null = null;
  selectedAttributeOptionId: number | null = null;

  constructor(
    private attributeService: AttributeService,
    private fb: FormBuilder,
    private getAllProductService: GetAllProductService
  ) { 
    this.productAttribute = this.fb.group({
      productId: ['', Validators.required],
      attributeOptionId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllAttributes();
    this.getAllProducts();
  }

  getAllProducts(): void {
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

  onProductSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedProductId = Number(selectElement.value);
  }

  onAttibuteOptionSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedAttributeOptionId = Number(selectElement.value);
  }

  onSubmit1(): void {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    if (this.selectedProductId === null || this.selectedAttributeOptionId === null) {
      alert('Please select a product and attribute.');
      return;
    }

    this.attributeService.uploadImageProductAttribute(
      this.selectedProductId,
      this.selectedAttributeOptionId,
      this.selectedFile
    ).subscribe({
      next: (response) => {
        if (response.status === 'CREATED') {
          alert('Image uploaded successfully!');
          this.selectedFile = null;

          const thumbnailsElement = document.querySelector('#thumbnailsContainer') as HTMLDivElement;
          if (thumbnailsElement) {
            thumbnailsElement.innerHTML = '';
          }
        } else {
          alert('Upload successful but with unexpected status.');
        }
      },
      error: (error: any) => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image.');
      }
    });
  }

  onFilesSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    const thumbnailsElement = document.querySelector('#thumbnailsContainer') as HTMLDivElement;

    if (file) {
      this.selectedFile = file;

      if (thumbnailsElement) {
        thumbnailsElement.innerHTML = ''; // Clear current thumbnails

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
            this.selectedFile = null; // Reset selected file
          });

          thumbnail.appendChild(removeButton);
          thumbnailsElement.appendChild(thumbnail);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}