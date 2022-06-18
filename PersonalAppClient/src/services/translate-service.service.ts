import { HttpClient } from '@angular/common/http';
import { IModuleTranslationOptions, ModuleTranslateLoader } from '@larscom/ngx-translate-module-loader';

export function HttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = './assets/i18n';

  const options: IModuleTranslationOptions = {
    version: Date.now(),
    translateError: (error, path) => {
      console.log('Oeps! an error occurred: ', { error, path });
    },
    modules: [
      { baseTranslateUrl, moduleName: 'Calendar' },
      { baseTranslateUrl, moduleName: 'Home' },
    ],
    lowercaseNamespace: true,
  };
  return new ModuleTranslateLoader(http, options);
}
