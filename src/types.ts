export interface FrameShape {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon identifier or description
}

export interface FrameColor {
  name: string;
  hex: string;
  class: string; // Tailwind bg class
}

export interface FrameModel {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  shapes: string[]; // Shape IDs supported
  colors: FrameColor[];
  image: string; // Stock photo or placeholder
  rating: number;
  reviewsCount: number;
  material: string;
  featured: boolean;
}

export interface LensOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
}

export interface FrameCustomization {
  model: FrameModel;
  shape: FrameShape;
  color: FrameColor;
  lens: LensOption;
}

export interface ComboOrder {
  id: string;
  pair1: FrameCustomization;
  pair2: FrameCustomization;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  date: string;
  status: 'pending' | 'shipping' | 'delivered';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  frameStyle: string;
  verified: boolean;
}
