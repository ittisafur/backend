import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsPortfolioComp extends Struct.ComponentSchema {
  collectionName: 'components_elements_portfolio_comps';
  info: {
    description: '';
    displayName: 'Portfolio Comp';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          maxLengthCharacters: 1200;
          preset: 'defaultHtml';
        }
      >;
    endDate: Schema.Attribute.Date;
    gallery: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
    hasDesign: Schema.Attribute.Boolean;
    isBreakThrough: Schema.Attribute.Boolean;
    isFeatured: Schema.Attribute.Boolean;
    isSideProject: Schema.Attribute.Boolean;
    isWorking: Schema.Attribute.Boolean;
    metaData: Schema.Attribute.Component<'seo.meta-data', false>;
    slug: Schema.Attribute.String & Schema.Attribute.Unique;
    stack: Schema.Attribute.Component<'elements.stack', true>;
    startDate: Schema.Attribute.Date;
    summary: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
    yt_demo: Schema.Attribute.String;
  };
}

export interface ElementsStack extends Struct.ComponentSchema {
  collectionName: 'components_elements_stacks';
  info: {
    displayName: 'Stack';
    icon: 'stack';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoKeywords extends Struct.ComponentSchema {
  collectionName: 'components_seo_keywords';
  info: {
    displayName: 'Keywords';
  };
  attributes: {
    keyword: Schema.Attribute.String;
  };
}

export interface SeoMetaData extends Struct.ComponentSchema {
  collectionName: 'components_seo_meta_data';
  info: {
    description: '';
    displayName: 'MetaData';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    keywords: Schema.Attribute.Component<'seo.keywords', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.portfolio-comp': ElementsPortfolioComp;
      'elements.stack': ElementsStack;
      'seo.keywords': SeoKeywords;
      'seo.meta-data': SeoMetaData;
    }
  }
}
