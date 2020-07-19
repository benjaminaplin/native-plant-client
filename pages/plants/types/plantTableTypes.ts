export interface Plant {
  id: number;
  friendly_name: string;
  light_requirements: string;
  botanical_name: string;
  growing_seasonality: string;
  plant_type: string;
  plant_placement_order: string;
}

enum LightRequirements {
  FullSun = "full_sun",
  FullSunToPartShade = "full_sun_to_part_shade",
  PartShade = "part_shade",
  PartShadeToFullShade = "part_shade_to_full_shade",
  FullShade = "full_shade",
}
enum PlantTypes {
  Shrub = "shrub",
  Tree = "tree",
  GroundCover = "groundCover",
  Vin = "vine",
}
enum GrowingSeasonality {
  Perennial = "perennial",
  Annual = "annual",
  Biennial = "biennial",
  Deciduous = "deciduous",
  Evergreen = "evergreen",
}

enum PlantPlacementOrder {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
}
