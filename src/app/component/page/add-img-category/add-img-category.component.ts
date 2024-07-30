import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatagoryService } from '../../../service/catagory/catagory.service';

@Component({
  selector: 'app-add-img-category',
  templateUrl: './add-img-category.component.html',
  styleUrl: './add-img-category.component.css'
})
export class AddImgCategoryComponent {
  categoryForm: FormGroup;
  categories: any[] = [];
  selectedFile: File | null = null; 
  selectedCategory: number | null = null;

  constructor(
    private fb: FormBuilder,
    private catagoryService: CatagoryService
  ) { 
    this.categoryForm = this.fb.group({
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.catagoryService.getCategories().subscribe(response => {
      if (response.status === 'OK') {
        this.categories = response.data.categories;
      }
    });
  }

  onCategorySelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = Number(selectElement.value);
  }

  uploadImages(): void {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    if (this.selectedCategory === null) {
      alert('Please select a category.');
      return;
    }

    this.catagoryService.uploadImageCategory(this.selectedCategory, this.selectedFile).subscribe({
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