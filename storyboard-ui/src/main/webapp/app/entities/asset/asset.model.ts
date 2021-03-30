import { AssetType } from 'app/entities/enumerations/asset-type.model';

export interface IAsset {
  type?: AssetType | null;
  id?: string;
  imageContentType?: string | null;
  image?: string | null;
}

export class Asset implements IAsset {
  constructor(public type?: AssetType | null, public id?: string, public imageContentType?: string | null, public image?: string | null) {}
}

export function getAssetIdentifier(asset: IAsset): string | undefined {
  return asset.id;
}
