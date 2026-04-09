const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'EV_Hybrid_Ireland_Comparison.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Image URLs from completecar.ie - mapped to our model names
// For variants of the same model, share the same image
const images = {
  // Alfa Romeo
  "Alfa Romeo|Junior Elettrica": "https://www.completecar.ie/img/galleries/14023/alfa_romeo_junior_ev_red_2025_004.jpg",

  // Audi
  "Audi|Q4 e-tron 40": "https://www.completecar.ie/img/galleries/11030/audi_q4_e_tron_40_blue_2021_suv_015.jpg",
  "Audi|Q4 e-tron 50 quattro": "https://www.completecar.ie/img/galleries/11030/audi_q4_e_tron_40_blue_2021_suv_015.jpg",
  "Audi|Q6 e-tron": "https://www.completecar.ie/img/galleries/13466/audi_q6_e_tron_suv_ev_2024_031.jpg",
  "Audi|SQ6 e-tron": "https://www.completecar.ie/img/galleries/13466/audi_q6_e_tron_suv_ev_2024_031.jpg",
  "Audi|A6 Sportback e-tron": "https://www.completecar.ie/img/galleries/13528/audi_a6_e_tron_2025_004.jpg",
  "Audi|e-tron GT": "https://www.completecar.ie/img/galleries/13406/audi_e_tron_gt_2024_010.jpg",
  "Audi|RS e-tron GT": "https://www.completecar.ie/img/galleries/13406/audi_e_tron_gt_2024_010.jpg",

  // BMW
  "BMW|iX1 eDrive20": "https://www.completecar.ie/img/galleries/11906/bmw_ix1_xdrive30_34.jpg",
  "BMW|iX2 xDrive30": "https://www.completecar.ie/img/galleries/12765/bmw_ix2_2024_red_025.jpg",
  "BMW|iX3": "https://www.completecar.ie/img/galleries/14349/bmw_ix3_ev_blue_2026_069.jpg",
  "BMW|i4 eDrive35": "https://www.completecar.ie/img/galleries/13225/bmw_i4_m50_lci_2024_006.jpg",
  "BMW|i5 eDrive40": "https://www.completecar.ie/img/galleries/12431/bmw_i5_2024_058.jpg",
  "BMW|iX xDrive40": "https://www.completecar.ie/img/galleries/14043/bmw_ix_m70_2025_001.jpg",
  "BMW|iX xDrive50": "https://www.completecar.ie/img/galleries/14043/bmw_ix_m70_2025_001.jpg",
  "BMW|iX M70 xDrive": "https://www.completecar.ie/img/galleries/14043/bmw_ix_m70_2025_001.jpg",
  "BMW|i7 xDrive60": "https://www.completecar.ie/img/galleries/12015/bmw_i7_7_series_dark_grey_2023_031.jpg",

  // BYD
  "BYD|Dolphin Surf Active": "https://www.completecar.ie/img/galleries/14138/byd_dolphin_surf_lime_green_2025_001.jpg",
  "BYD|Dolphin Surf Boost": "https://www.completecar.ie/img/galleries/14138/byd_dolphin_surf_lime_green_2025_001.jpg",
  "BYD|Dolphin Surf Comfort": "https://www.completecar.ie/img/galleries/14138/byd_dolphin_surf_lime_green_2025_001.jpg",
  "BYD|Atto 2": "https://www.completecar.ie/img/galleries/13890/byd_atto_2_ev_green_2025_009.jpg",
  "BYD|ATTO 3 Comfort": "https://www.completecar.ie/img/galleries/14712/byd_atto_3_evo_2026_blue_092.jpg",
  "BYD|ATTO 3 Design": "https://www.completecar.ie/img/galleries/14712/byd_atto_3_evo_2026_blue_092.jpg",
  "BYD|Seal Design": "https://www.completecar.ie/img/galleries/12348/byd_seal_blue_2023_006.jpg",
  "BYD|Seal U Hybrid": "https://www.completecar.ie/img/galleries/12348/byd_seal_blue_2023_006.jpg",
  "BYD|Sealion 7": "https://www.completecar.ie/img/galleries/13741/byd_sealion_7_2025_blue_014.jpg",

  // Citroen
  "Citroen|e-C3": "https://www.completecar.ie/img/galleries/12783/citroen_e_c3_2024_017.jpg",
  "Citroen|e-C3 Aircross": "https://www.completecar.ie/img/galleries/13886/citroen_e_c3_aircross_red_2025_031.jpg",
  "Citroen|e-C4": "https://www.completecar.ie/img/galleries/13660/citroen_e_c4_2024_reveal6.jpg",
  "Citroen|e-C4 X": "https://www.completecar.ie/img/galleries/13660/citroen_e_c4x_2024_reveal1.jpg",
  "Citroen|e-Berlingo Electric": "https://www.completecar.ie/img/galleries/11811/citroen_e_berlingo_blue_long_electric_2022_027.jpg",
  "Citroen|e-C5 Aircross": "https://www.completecar.ie/img/galleries/14072/citroen_c5_aircross_green_2025_030.jpg",

  // Cupra
  "Cupra|Born e-Boost 59kWh": "https://www.completecar.ie/img/galleries/11236/cupra_born_electric_2022_017.jpg",
  "Cupra|Born VZ 79kWh": "https://www.completecar.ie/img/galleries/11236/cupra_born_electric_2022_017.jpg",
  "Cupra|Raval": "https://www.completecar.ie/img/galleries/14361/_tb_9410__copyright_guido_ten_brink___sb_medien.jpg",
  "Cupra|Tavascan 77kWh": "https://www.completecar.ie/img/galleries/12358/cupra_tavascan_2024_003.jpg",
  "Cupra|Tavascan VZ 77kWh": "https://www.completecar.ie/img/galleries/12358/cupra_tavascan_2024_003.jpg",
  "Cupra|Formentor e-HYBRID 204hp": "https://www.completecar.ie/img/galleries/12358/cupra_tavascan_2024_003.jpg",
  "Cupra|Leon e-HYBRID 204hp": "https://www.completecar.ie/img/galleries/11236/cupra_born_electric_2022_017.jpg",
  "Cupra|Terramar e-HYBRID": "https://www.completecar.ie/img/galleries/12358/cupra_tavascan_2024_003.jpg",

  // Dacia
  "Dacia|Spring Expression": "https://www.completecar.ie/img/galleries/13482/dacia_spring_beige_2024_009_2.jpg",
  "Dacia|Spring Extreme": "https://www.completecar.ie/img/galleries/13482/dacia_spring_beige_2024_009_2.jpg",

  // DS
  "DS|3 E-Tense": "https://www.completecar.ie/img/galleries/12141/ds_3_e_tense_electric_red_2023_037.jpg",
  "DS|4 E-Tense": "https://www.completecar.ie/img/galleries/14110/ds_n__4_ext_cam_019_blanche.jpg",

  // Fiat
  "Fiat|500e": "https://www.completecar.ie/img/galleries/10614/fiat_500_cabriolet_electric_blue_2021_040.jpg",
  "Fiat|600e": "https://www.completecar.ie/img/galleries/12727/fiat_600e_la_prima__summary__2024_052.jpg",
  "Fiat|Grande Panda Electric": "https://www.completecar.ie/img/galleries/13400/fronta002.jpg",

  // Ford
  "Ford|Puma Gen-E": "https://www.completecar.ie/img/galleries/14040/ford_puma_gen_e_2025_yellow_01.jpg",
  "Ford|Explorer Electric": "https://www.completecar.ie/img/galleries/12277/ford_explorer_ev_2024_blue_004.jpg",
  "Ford|Capri Electric": "https://www.completecar.ie/img/news/13475_large.jpg",
  "Ford|Mustang Mach-E": "https://www.completecar.ie/img/galleries/11246/ford_mustang_mach_e_gt_yellow_2022_011.jpg",

  // Honda
  "Honda|e:Ny1": "https://www.completecar.ie/img/galleries/13373/honda_eny_1_ev_2024_black_3.jpg",

  // Hyundai
  "Hyundai|Inster": "https://www.completecar.ie/img/galleries/13454/hyundaiinster4901_1.jpg",
  "Hyundai|Kona Electric": "https://www.completecar.ie/img/galleries/12793/hyundai_kona_electric_2023_004.jpg",
  "Hyundai|Kona Hybrid": "https://www.completecar.ie/img/galleries/12793/hyundai_kona_electric_2023_004.jpg",
  "Hyundai|Ioniq 5": "https://www.completecar.ie/img/galleries/11117/hyundai_ioniq_5_ev_2021_001.jpg",
  "Hyundai|Ioniq 6": "https://www.completecar.ie/img/galleries/14019/hyundai_ioniq6_2.jpg",
  "Hyundai|Ioniq 9": "https://www.completecar.ie/img/news/13749_large.jpg",
  "Hyundai|Tucson Hybrid": "https://www.completecar.ie/img/galleries/11117/hyundai_ioniq_5_ev_2021_001.jpg",
  "Hyundai|Tucson PHEV": "https://www.completecar.ie/img/galleries/11117/hyundai_ioniq_5_ev_2021_001.jpg",
  "Hyundai|Santa Fe Hybrid": "https://www.completecar.ie/img/news/13749_large.jpg",
  "Hyundai|Santa Fe PHEV": "https://www.completecar.ie/img/news/13749_large.jpg",

  // Jeep
  "Jeep|Avenger Electric": "https://www.completecar.ie/img/galleries/12354/jeep_avenger_2023_013.jpg",

  // Kia
  "Kia|EV3": "https://www.completecar.ie/img/galleries/13324/ev3_front.jpg",
  "Kia|EV4": "https://www.completecar.ie/img/galleries/13909/kia_ev4_hatchback_gt_line_003.jpg",
  "Kia|EV4 Fastback": "https://www.completecar.ie/img/galleries/13909/kia_ev4_hatchback_gt_line_003.jpg",
  "Kia|EV5": "https://www.completecar.ie/img/galleries/12775/_1_ev5_ext1.jpg",
  "Kia|EV6": "https://www.completecar.ie/img/galleries/11241/kia_ev6_gt_line_blue_2022_electric_008.jpg",
  "Kia|EV9": "https://www.completecar.ie/img/galleries/12438/kia_ev9_gt_line_blue_2023_027.jpg",
  "Kia|Niro EV": "https://www.completecar.ie/img/galleries/11772/kia_niro_ev_2022_white_005.jpg",
  "Kia|Niro PHEV": "https://www.completecar.ie/img/galleries/11772/kia_niro_ev_2022_white_005.jpg",
  "Kia|Niro Hybrid": "https://www.completecar.ie/img/galleries/11772/kia_niro_ev_2022_white_005.jpg",
  "Kia|Sportage Hybrid": "https://www.completecar.ie/img/galleries/11241/kia_ev6_gt_line_blue_2022_electric_008.jpg",
  "Kia|Sportage PHEV": "https://www.completecar.ie/img/galleries/11241/kia_ev6_gt_line_blue_2022_electric_008.jpg",
  "Kia|Sorento PHEV": "https://www.completecar.ie/img/galleries/12438/kia_ev9_gt_line_blue_2023_027.jpg",

  // Lexus
  "Lexus|RZ 450e": "https://www.completecar.ie/img/galleries/13965/lexus_rz_2025_025.jpg",

  // Lotus
  "Lotus|Eletre": "https://www.completecar.ie/img/galleries/11554/lotus_eletre_electric_suv_2022_013.jpg",
  "Lotus|Emeya": "https://www.completecar.ie/img/galleries/12690/sh02004_011_lotus_alpha_78front_comp12_rbn_finalart_lotus.jpg",

  // Mazda
  "Mazda|MX-30 EV": "https://www.completecar.ie/img/galleries/10456/mazda_mx_30_ev_red_2021_017.jpg",
  "Mazda|6e": "https://www.completecar.ie/img/galleries/13829/mazda6e_2.jpg",
  "Mazda|CX-5 Hybrid": "https://www.completecar.ie/img/galleries/10456/mazda_mx_30_ev_red_2021_017.jpg",
  "Mazda|CX-60 PHEV": "https://www.completecar.ie/img/galleries/13829/mazda6e_2.jpg",
  "Mazda|CX-80 PHEV": "https://www.completecar.ie/img/galleries/13829/mazda6e_2.jpg",
  "Mazda|Mazda2 Hybrid": "https://www.completecar.ie/img/galleries/10456/mazda_mx_30_ev_red_2021_017.jpg",

  // Mercedes-Benz
  "Mercedes-Benz|CLA Electric": "https://www.completecar.ie/img/galleries/14231/mercedes_benz_cla_350_4matic_ev_grey_2025_021.jpg",
  "Mercedes-Benz|EQA 250+": "https://www.completecar.ie/img/galleries/11017/mercedes_benz_eqa_250_2021_white__06.jpg",
  "Mercedes-Benz|EQB": "https://www.completecar.ie/img/galleries/11545/mercedes_benz_eqb_electric_suv_2022_grey_12.jpg",
  "Mercedes-Benz|EQE 300 Saloon": "https://www.completecar.ie/img/galleries/11734/mercedes_eqe_2022_silver__21.jpg",
  "Mercedes-Benz|EQE SUV": "https://www.completecar.ie/img/news/11972_large.jpg",
  "Mercedes-Benz|EQS 450+ Saloon": "https://www.completecar.ie/img/galleries/11627/mercedes_benz_eqs_450_electric_2022_002.jpg",
  "Mercedes-Benz|EQS SUV": "https://www.completecar.ie/img/galleries/12537/mercedes_benz_eqs_suv__2_.jpg",
  "Mercedes-Benz|EQV 300": "https://www.completecar.ie/img/galleries/13284/mercedes_benz_v_class_facelift_2024_006.jpg",
  "Mercedes-Benz|G 580 Electric": "https://www.completecar.ie/img/galleries/13846/mercedes_benz_g_580_eq_electric_2025_blue_009.jpg",
  "Mercedes-Benz|GLC Electric": "https://www.completecar.ie/img/galleries/14356/mercedes_benz_glc_with_eq_technology_14.jpg",

  // MG
  "MG|MG3 Hybrid+": "https://www.completecar.ie/img/galleries/14704/mg4_ev_blue_uk_2026_066.jpg",
  "MG|MG4 EV Standard Range": "https://www.completecar.ie/img/galleries/14704/mg4_ev_blue_uk_2026_066.jpg",
  "MG|MG4 EV Long Range": "https://www.completecar.ie/img/galleries/14704/mg4_ev_blue_uk_2026_066.jpg",
  "MG|MG4 EV Extended Range": "https://www.completecar.ie/img/galleries/14704/mg4_ev_blue_uk_2026_066.jpg",
  "MG|MG4 XPower": "https://www.completecar.ie/img/galleries/14704/mg4_ev_blue_uk_2026_066.jpg",
  "MG|MG5 EV Long Range": "https://www.completecar.ie/img/galleries/12274/mg_5_electric_estate_red_2023_10.jpg",
  "MG|MG ZS EV Long Range": "https://www.completecar.ie/img/galleries/11589/mg_zs_ev_blue_electric_2022_006.jpg",
  "MG|MG ZS Hybrid+": "https://www.completecar.ie/img/galleries/11589/mg_zs_ev_blue_electric_2022_006.jpg",
  "MG|MG HS PHEV": "https://www.completecar.ie/img/galleries/11589/mg_zs_ev_blue_electric_2022_006.jpg",
  "MG|MGS5 EV": "https://www.completecar.ie/img/galleries/14082/mgs5_ev_suv_2025_01.jpg",
  "MG|S6 EV": "https://www.completecar.ie/img/galleries/14721/mgs6_ev_beige_2026_studio_014.jpg",
  "MG|Cyberster": "https://www.completecar.ie/img/galleries/13064/mg_cyberster_yellow_2024_016.jpg",

  // MINI
  "MINI|Cooper Electric": "https://www.completecar.ie/img/galleries/12662/mini_e_cooper_se_blue_2024_001.jpg",
  "MINI|Aceman": "https://www.completecar.ie/img/galleries/13763/mini_aceman_se_red_2025_058.jpg",
  "MINI|Countryman Electric": "https://www.completecar.ie/img/galleries/12661/mini_countryman_suv_2024_001.jpg",

  // Nissan
  "Nissan|Leaf": "https://www.completecar.ie/img/galleries/14267/nissan_leaf_blue_2026_denmark_039.jpg",
  "Nissan|Leaf 40kWh": "https://www.completecar.ie/img/galleries/14267/nissan_leaf_blue_2026_denmark_039.jpg",
  "Nissan|Ariya 63kWh": "https://www.completecar.ie/img/galleries/11939/nissan_ariya_white_2022__2.jpg",
  "Nissan|Ariya 87kWh": "https://www.completecar.ie/img/galleries/11939/nissan_ariya_white_2022__2.jpg",
  "Nissan|Micra Electric": "https://www.completecar.ie/img/galleries/14122/nissan_micra_ev_blue_2025_010.jpg",
  "Nissan|Juke Hybrid": "https://www.completecar.ie/img/galleries/11939/nissan_ariya_white_2022__2.jpg",
  "Nissan|Qashqai e-Power": "https://www.completecar.ie/img/galleries/11939/nissan_ariya_white_2022__2.jpg",
  "Nissan|X-Trail e-Power": "https://www.completecar.ie/img/galleries/11939/nissan_ariya_white_2022__2.jpg",

  // Opel
  "Opel|Frontera Electric": "https://www.completecar.ie/img/galleries/13180/newopelfrontera__3_.jpg",
  "Opel|Frontera Hybrid": "https://www.completecar.ie/img/galleries/13180/newopelfrontera__3_.jpg",
  "Opel|Corsa Electric SC": "https://www.completecar.ie/img/galleries/12424/opel_corsa_electric_2024_005.jpg",
  "Opel|Corsa Electric Elite": "https://www.completecar.ie/img/galleries/12424/opel_corsa_electric_2024_005.jpg",
  "Opel|Corsa Hybrid": "https://www.completecar.ie/img/galleries/12424/opel_corsa_electric_2024_005.jpg",
  "Opel|Mokka Electric": "https://www.completecar.ie/img/galleries/10746/opel_mokka_e_2021_green_ev_electric_004.jpg",
  "Opel|Mokka Hybrid": "https://www.completecar.ie/img/galleries/10746/opel_mokka_e_2021_green_ev_electric_004.jpg",
  "Opel|Astra Electric": "https://www.completecar.ie/img/galleries/12506/opel_astra_electric_blue_2023_035.jpg",
  "Opel|Astra Hybrid": "https://www.completecar.ie/img/galleries/12506/opel_astra_electric_blue_2023_035.jpg",
  "Opel|Astra Sports Tourer Electric": "https://www.completecar.ie/img/galleries/12506/opel_astra_electric_blue_2023_035.jpg",
  "Opel|Grandland Electric SC": "https://www.completecar.ie/img/galleries/13220/newopelgrandland__7_.jpg",
  "Opel|Grandland Electric Elegance": "https://www.completecar.ie/img/galleries/13220/newopelgrandland__7_.jpg",
  "Opel|Grandland Electric GS": "https://www.completecar.ie/img/galleries/13220/newopelgrandland__7_.jpg",
  "Opel|Grandland Hybrid SC": "https://www.completecar.ie/img/galleries/13220/newopelgrandland__7_.jpg",
  "Opel|Grandland Hybrid Elegance": "https://www.completecar.ie/img/galleries/13220/newopelgrandland__7_.jpg",
  "Opel|Grandland Hybrid GS": "https://www.completecar.ie/img/galleries/13220/newopelgrandland__7_.jpg",

  // Peugeot
  "Peugeot|e-208": "https://www.completecar.ie/img/galleries/12555/2214552_bp6laj7t3d.jpg",
  "Peugeot|e-2008": "https://www.completecar.ie/img/galleries/12533/peugeot_e_2008_electric_grey_2023_024.jpg",
  "Peugeot|e-308": "https://www.completecar.ie/img/news/11881_large.jpg",
  "Peugeot|e-408": "https://www.completecar.ie/img/news/13621_large.jpg",
  "Peugeot|e-3008": "https://www.completecar.ie/img/galleries/13080/peugeot_e_3008_electric_white_2024_004.jpg",
  "Peugeot|e-5008": "https://www.completecar.ie/img/galleries/13460/peugeot_e_5008_gt_blue_2024_090.jpg",
  "Peugeot|e-Rifter": "https://www.completecar.ie/img/galleries/12852/peugeot_e_rifter_2024_green_002.jpg",
  "Peugeot|308 Hybrid": "https://www.completecar.ie/img/news/11881_large.jpg",
  "Peugeot|408 PHEV": "https://www.completecar.ie/img/news/13621_large.jpg",
  "Peugeot|3008 Hybrid": "https://www.completecar.ie/img/galleries/13080/peugeot_e_3008_electric_white_2024_004.jpg",
  "Peugeot|5008 Hybrid": "https://www.completecar.ie/img/galleries/13460/peugeot_e_5008_gt_blue_2024_090.jpg",

  // Polestar
  "Polestar|2 Standard Range": "https://www.completecar.ie/img/galleries/11557/polestar_2_fwd_2022_grey_001.jpg",
  "Polestar|2 Long Range": "https://www.completecar.ie/img/galleries/11557/polestar_2_fwd_2022_grey_001.jpg",
  "Polestar|3": "https://www.completecar.ie/img/galleries/11960/polestar_3_suv_ev_white_2023_005.jpg",
  "Polestar|4": "https://www.completecar.ie/img/galleries/13462/polestar_4_2024_010.jpg",

  // Porsche
  "Porsche|Taycan RWD": "https://www.completecar.ie/img/galleries/13850/porsche_taycan_2025_009.jpg",
  "Porsche|Taycan 4S": "https://www.completecar.ie/img/galleries/13850/porsche_taycan_2025_009.jpg",
  "Porsche|Taycan GTS": "https://www.completecar.ie/img/galleries/13850/porsche_taycan_2025_009.jpg",
  "Porsche|Taycan Turbo": "https://www.completecar.ie/img/galleries/13850/porsche_taycan_2025_009.jpg",
  "Porsche|Taycan Cross Turismo": "https://www.completecar.ie/img/galleries/13022/porsche_taycan_2024_006.jpg",
  "Porsche|Taycan Sport Turismo": "https://www.completecar.ie/img/galleries/13167/porsche_taycan_turbo_sport_turismo_2024_023.jpg",
  "Porsche|Macan Electric": "https://www.completecar.ie/img/galleries/13494/02_macan.jpg",
  "Porsche|Macan 4 Electric": "https://www.completecar.ie/img/galleries/13494/02_macan.jpg",

  // Renault
  "Renault|5 E-Tech": "https://www.completecar.ie/img/galleries/13061/renault_5_e_tech_electric_2024_yellow_53.jpg",
  "Renault|4 E-Tech Electric 40kWh": "https://www.completecar.ie/img/galleries/13655/renault_4_electric_2025_004.jpg",
  "Renault|4 E-Tech Electric 52kWh": "https://www.completecar.ie/img/galleries/13655/renault_4_electric_2025_004.jpg",
  "Renault|Megane E-Tech": "https://www.completecar.ie/img/galleries/11498/renault_megane_e_tech_electric_2022_031.jpg",
  "Renault|Scenic E-Tech": "https://www.completecar.ie/img/galleries/13256/renault_scenic_e_tech_electric___esprit_alpine_shale_grey.jpg",
  "Renault|Scenic E-Tech 87kWh": "https://www.completecar.ie/img/galleries/13256/renault_scenic_e_tech_electric___esprit_alpine_shale_grey.jpg",
  "Renault|Captur E-Tech Hybrid": "https://www.completecar.ie/img/galleries/13655/renault_4_electric_2025_004.jpg",
  "Renault|Clio Full Hybrid E-Tech": "https://www.completecar.ie/img/galleries/13061/renault_5_e_tech_electric_2024_yellow_53.jpg",
  "Renault|Symbioz Full Hybrid E-Tech": "https://www.completecar.ie/img/galleries/13256/renault_scenic_e_tech_electric___esprit_alpine_shale_grey.jpg",
  "Renault|Austral Full Hybrid E-Tech": "https://www.completecar.ie/img/galleries/13256/renault_scenic_e_tech_electric___esprit_alpine_shale_grey.jpg",
  "Renault|Rafale Full Hybrid E-Tech": "https://www.completecar.ie/img/galleries/13256/renault_scenic_e_tech_electric___esprit_alpine_shale_grey.jpg",
  "Renault|Twingo E-Tech": "https://www.completecar.ie/img/galleries/14510/renault_twingo_2026_091.jpg",

  // Skoda
  "Skoda|Elroq": "https://www.completecar.ie/img/galleries/13782/skoda_elroq_green_2025_033.jpg",
  "Skoda|Elroq 60": "https://www.completecar.ie/img/galleries/13782/skoda_elroq_green_2025_033.jpg",
  "Skoda|Elroq 85": "https://www.completecar.ie/img/galleries/13782/skoda_elroq_green_2025_033.jpg",
  "Skoda|Enyaq": "https://www.completecar.ie/img/galleries/14007/skoda_enyaq_facelift_2025_green_007.jpg",
  "Skoda|Enyaq (higher spec)": "https://www.completecar.ie/img/galleries/14007/skoda_enyaq_facelift_2025_green_007.jpg",
  "Skoda|Enyaq Coupe": "https://www.completecar.ie/img/galleries/14007/skoda_enyaq_coupe_sportline_facelift_2025_red_008.jpg",
  "Skoda|Superb iV PHEV": "https://www.completecar.ie/img/galleries/14007/skoda_enyaq_facelift_2025_green_007.jpg",
  "Skoda|Kodiaq iV PHEV": "https://www.completecar.ie/img/galleries/14007/skoda_enyaq_facelift_2025_green_007.jpg",

  // Smart
  "Smart|#1": "https://www.completecar.ie/img/galleries/12900/smart__1__rear_.jpg",
  "Smart|#3": "https://www.completecar.ie/img/galleries/12904/smart_3_2024_014.jpg",

  // Subaru
  "Subaru|Solterra": "https://www.completecar.ie/img/galleries/14049/new_solterra_lr.jpg",

  // Suzuki
  "Suzuki|e Vitara": "https://www.completecar.ie/img/galleries/14473/suzuki_e_vitara_2026_uk_drive_030.jpg",

  // Tesla
  "Tesla|Model 3 RWD": "https://www.completecar.ie/img/galleries/12787/12664_large.jpg",
  "Tesla|Model 3 Long Range AWD": "https://www.completecar.ie/img/galleries/12787/12664_large.jpg",
  "Tesla|Model 3 Performance": "https://www.completecar.ie/img/galleries/12787/12664_large.jpg",
  "Tesla|Model Y RWD": "https://www.completecar.ie/img/galleries/14694/tesla_model_y_long_range_rear_wheel_drive_12.jpg",
  "Tesla|Model Y Long Range AWD": "https://www.completecar.ie/img/galleries/14694/tesla_model_y_long_range_rear_wheel_drive_12.jpg",
  "Tesla|Model Y Performance": "https://www.completecar.ie/img/galleries/14694/tesla_model_y_long_range_rear_wheel_drive_12.jpg",

  // Toyota
  "Toyota|bZ4X": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",
  "Toyota|Urban Cruiser": "https://www.completecar.ie/img/galleries/13791/urbancruiserhero_3.jpg",
  "Toyota|Aygo X Hybrid": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",
  "Toyota|Yaris Hybrid": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",
  "Toyota|Yaris Cross Hybrid": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",
  "Toyota|C-HR Hybrid": "https://www.completecar.ie/img/galleries/13962/toyota_c_hr_ev_2025_002.jpg",
  "Toyota|C-HR PHEV": "https://www.completecar.ie/img/galleries/13962/toyota_c_hr_ev_2025_002.jpg",
  "Toyota|Corolla Hatchback Hybrid": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",
  "Toyota|Corolla Saloon Hybrid": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",
  "Toyota|Corolla Touring Sports Hybrid": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",
  "Toyota|RAV4 Hybrid": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",
  "Toyota|RAV4 PHEV": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",
  "Toyota|Prius PHEV": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",
  "Toyota|Highlander Hybrid": "https://www.completecar.ie/img/galleries/13966/toyota_bz4x_2025_016.jpg",

  // Volkswagen
  "Volkswagen|ID.3 Pure 52kWh": "https://www.completecar.ie/img/galleries/12585/volkswagen_id_3_2023_green_027.jpg",
  "Volkswagen|ID.3 Pro S 77kWh": "https://www.completecar.ie/img/galleries/12585/volkswagen_id_3_2023_green_027.jpg",
  "Volkswagen|ID.4 Pure 52kWh": "https://www.completecar.ie/img/galleries/11358/volkswagen_id_4_gtx_suv_2022_red_021.jpg",
  "Volkswagen|ID.4 Pro 77kWh": "https://www.completecar.ie/img/galleries/11358/volkswagen_id_4_gtx_suv_2022_red_021.jpg",
  "Volkswagen|ID.4 GTX Plus 79kWh": "https://www.completecar.ie/img/galleries/11358/volkswagen_id_4_gtx_suv_2022_red_021.jpg",
  "Volkswagen|ID.5 Pure 52kWh": "https://www.completecar.ie/img/galleries/11632/volkswagen_id5_pro_silver_2022_011.jpg",
  "Volkswagen|ID.5 Pro 77kWh": "https://www.completecar.ie/img/galleries/11632/volkswagen_id5_pro_silver_2022_011.jpg",
  "Volkswagen|ID.5 GTX 79kWh": "https://www.completecar.ie/img/galleries/11632/volkswagen_id5_pro_silver_2022_011.jpg",
  "Volkswagen|ID.7 Pro Plus": "https://www.completecar.ie/img/galleries/12490/db2023au00261_large.jpg",
  "Volkswagen|ID.7 GTX Plus": "https://www.completecar.ie/img/galleries/12490/db2023au00261_large.jpg",
  "Volkswagen|ID.7 Tourer Pure Plus": "https://www.completecar.ie/img/galleries/12490/db2023au00261_large.jpg",
  "Volkswagen|ID.7 Tourer GTX Plus": "https://www.completecar.ie/img/galleries/12490/db2023au00261_large.jpg",
  "Volkswagen|ID.Buzz Pro": "https://www.completecar.ie/img/galleries/13488/volkswagen_id_buzz_lwb_2024_yellow_white_022.jpg",
  "Volkswagen|ID.Buzz GTX": "https://www.completecar.ie/img/galleries/13488/volkswagen_id_buzz_lwb_2024_yellow_white_022.jpg",

  // Volvo
  "Volvo|EX30 Plus RWD": "https://www.completecar.ie/img/galleries/12459/volvo_ex30_2024_002.jpg",
  "Volvo|EX30 Cross Country": "https://www.completecar.ie/img/galleries/12459/volvo_ex30_2024_002.jpg",
  "Volvo|EX40": "https://www.completecar.ie/img/galleries/12140/volvo_xc40_electric_2023_001.jpg",
  "Volvo|EC40": "https://www.completecar.ie/img/galleries/12140/volvo_c40_electric_2023_006.jpg",
  "Volvo|EX60": "https://www.completecar.ie/img/news/14653_large.jpg",
  "Volvo|EX90 Twin Motor": "https://www.completecar.ie/img/news/12020_large.jpg",
  "Volvo|ES90": "https://www.completecar.ie/img/galleries/13948/volvo_es90_electric_saloon_2025_004.jpg",
  "Volvo|XC40 Recharge PHEV": "https://www.completecar.ie/img/galleries/12140/volvo_xc40_electric_2023_001.jpg",
  "Volvo|XC60 Recharge PHEV": "https://www.completecar.ie/img/news/12020_large.jpg",

  // Xpeng
  "Xpeng|G6": "https://www.completecar.ie/img/galleries/14350/xpeng_g6_awd_2026_020.jpg",
  "Xpeng|G9": "https://www.completecar.ie/img/galleries/14351/speng_g9_performance_2026_011.jpg",

  // Zeekr
  "Zeekr|X": "https://www.completecar.ie/img/galleries/12762/zeekr_x_2024_047.jpg",
  "Zeekr|7X": "https://www.completecar.ie/img/galleries/14038/zeekr_7x_grey_2025_005.jpg",
  "Zeekr|001": "https://www.completecar.ie/img/galleries/12768/zeekr_001_2023_white_043.jpg",
};

let added = 0;
data.cars.forEach(car => {
  const key = `${car.make}|${car.model}`;
  if (images[key]) {
    car.imageUrl = images[key];
    added++;
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Added images: ${added}/${data.cars.length}`);
console.log(`Missing: ${data.cars.length - added}`);

// Show which ones are missing
data.cars.forEach(car => {
  if (!car.imageUrl) console.log(`  NO IMAGE: ${car.make} ${car.model}`);
});
