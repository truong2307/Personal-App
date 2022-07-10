import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomMatPaginationService extends MatPaginatorIntl {
  constructor(
    private translate: TranslateService,
  ) {
    super();

    this.translate.onLangChange.subscribe(() => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    this.itemsPerPageLabel = this.translate.instant('common.LabelPagination');
    this.nextPageLabel = this.translate.instant('common.NextPage');
    this.previousPageLabel = this.translate.instant('common.PreviousPage');
    this.changes.next();
  }

}

