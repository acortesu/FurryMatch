import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { OwnerFormService, OwnerFormGroup } from './owner-form.service';
import { IOwner } from '../owner.model';
import { OwnerService } from '../service/owner.service';

@Component({
  selector: 'jhi-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css'],
})
export class OwnerUpdateComponent implements OnInit {
  isSaving = false;
  owner: IOwner | null = null;

  editForm: OwnerFormGroup = this.ownerFormService.createOwnerFormGroup();

  constructor(
    protected ownerService: OwnerService,
    protected ownerFormService: OwnerFormService,
    protected activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ owner }) => {
      this.owner = owner;
      if (owner) {
        this.updateForm(owner);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    const userPassword = this.editForm.get('userPassword')?.value;
    const confirmPassword = this.elementRef.nativeElement.querySelector('#confirmPassword').value;

    if (userPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (userPassword && !regex.test(userPassword)) {
      alert('La contraseña debe tener al menos 8 caracteres con números y letras.');
      return;
    }

    this.isSaving = true;
    const owner = this.ownerFormService.getOwner(this.editForm);
    if (owner.id !== null) {
      this.subscribeToSaveResponse(this.ownerService.update(owner));
    } else {
      this.subscribeToSaveResponse(this.ownerService.create(owner));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOwner>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(owner: IOwner): void {
    this.owner = owner;
    this.ownerFormService.resetForm(this.editForm, owner);
  }
}
