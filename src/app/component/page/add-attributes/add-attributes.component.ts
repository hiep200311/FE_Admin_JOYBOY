import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttributeService } from '../../../service/attribute/attribute.service';

@Component({
  selector: 'app-add-attributes',
  templateUrl: './add-attributes.component.html',
  styleUrl: './add-attributes.component.css'
})
export class AddAttributesComponent implements OnInit {
  attributes: any[] = [];
  attributeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private attributeService: AttributeService
  ) { 
    this.attributeForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllAtribteType();
  }

  getAllAtribteType(): void {
    this.attributeService.getAllAttributeTypes().subscribe(response => {
      if (response.status === 'OK') {
        this.attributes = response.data.attributeTypes;
      }
    });
  }

  onSubmit(): void {
    if (this.attributeForm.valid) {
      this.attributeService.addAttributeType(this.attributeForm.value.name).subscribe(response => {
        if (response.status === 'OK') {
          alert('Tạo loại thuộc tính thành công');
          this.attributeForm.reset();
          this.getAllAtribteType();
        } else {
          alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
      }, error => {
        console.error('Error creating attribute type:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
  }
}