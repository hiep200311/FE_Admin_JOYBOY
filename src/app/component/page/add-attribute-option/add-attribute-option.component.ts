import { Component, OnInit } from '@angular/core';
import { AttributeService } from '../../../service/attribute/attribute.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-attribute-option',
  templateUrl: './add-attribute-option.component.html',
  styleUrl: './add-attribute-option.component.css'
})
export class AddAttributeOptionComponent implements OnInit {
  attributes: any[] = [];
  attributeForm: FormGroup;
  attributeTypes: any[] = [];

  constructor(
    private attributeService: AttributeService,
    private fb: FormBuilder,
  ) { 
    this.attributeForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllAttributes();
    this.getAllAttributeTypes();
  }

  getAllAttributes(): void {
    this.attributeService.getAllAttributeOptions().subscribe(response => {
      if (response.status === 'OK') {
        this.attributes = response.data.attributeOptions;
      }
    });
  }

  getAllAttributeTypes(): void {
    this.attributeService.getAllAttributeTypes().subscribe(response => {
      if (response.status === 'OK') {
        this.attributeTypes = response.data.attributeTypes;
      }
    });
  }

  onSubmit(): void {
    if (this.attributeForm.valid) {
      const formValue = this.attributeForm.value;
      const attributeOption = {
        attribute_option_name: formValue.name,
        attribute_option_value: formValue.value,
        attribute_type_id: formValue.categoryId
      };

      this.attributeService.addAttributeOption(attributeOption).subscribe(
        (response: any) => {
          if (response.status === 'OK') {
            alert('Tạo tùy chọn thuộc tính thành công');
            this.attributeForm.reset();
            this.getAllAttributes(); // Refresh the list
          } else {
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
          }
        },
        (error: any) => {
          console.error('Error creating attribute option:', error);
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
