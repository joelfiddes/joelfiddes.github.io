import { useState } from 'react'
import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'

type Publication = {
  authors: string
  year: number
  title: string
  venue: string
  type: 'peer-reviewed' | 'report' | 'book' | 'thesis' | 'policy'
  link?: string
}

const allPublications: Publication[] = [
  // 2026
  { authors: 'Pokhrel, P., Griffioen, J., Bogaard, T.A., Kraaijenbrink, P.D.A., Fiddes, J., & Immerzeel, W.W.', year: 2026, title: 'Upstream hydrology and the importance of snowmelt in buffering droughts in the Karnali basin in Nepal', venue: 'Frontiers in Water, 7', type: 'peer-reviewed', link: 'https://doi.org/10.3389/frwa.2025.1720178' },
  // 2025
  { authors: 'Khanal, S., Faezeh, N., Fiddes, J., Kraaijenbrink, P., Immerzeel, W., et al.', year: 2025, title: 'Guidelines for Glacio-hydrological Modelling in High Mountain Asia', venue: 'FutureWater Report 265', type: 'report', link: 'https://www.futurewater.eu/projects/development-of-a-glacio-hydrological-model-and-iwrm-plan-for-the-uttarakhand-subbasin-in-india/' },
  { authors: 'Khanal, S., Droogers, P., Nick, F., Kraaijenbrink, P., Immerzeel, W., & Fiddes, J.', year: 2025, title: 'Mountain Water Management under Climate Change in Zarafshon River Basin', venue: 'GIZ/TRIGGER', type: 'report', link: 'https://www.futurewater.eu/projects/integrated-water-resources-management-in-tajikistan/' },
  { authors: 'Boj Garcia, E., Khanal, S., Immerzeel, W., Droogers, P., Zwarts, M., Fiddes, J., et al.', year: 2025, title: 'Melting Mountains, Securing Water: a Policy Note for Advancing Mountain Water Management to Strengthen Livelihoods in Tajikistan and Central Asia', venue: 'GIZ/TRIGGER', type: 'policy', link: 'https://www.futurewater.nl/wp-content/uploads/2025/11/Tajikistan-Glaciers-Policy-Note.pdf' },
  { authors: 'Luojus, K., & WMO GCW Snow Watch Team (incl. Fiddes, J.)', year: 2025, title: 'WMO GCW Snow Assessment for Winter 2024-2025, Northern Hemisphere and Regional Aspects', venue: 'WMO', type: 'report', link: 'https://globalcryospherewatch.org/snow-assessments-2025/' },
  // 2024
  { authors: 'González-Herrero, S., Sigmund, A., Haugeneder, M., Hames, O., Huwald, H., Fiddes, J., & Lehning, M.', year: 2024, title: 'Using the sensible heat flux eddy covariance-based exchange coefficient to calculate latent heat from moisture mean gradients on snow', venue: 'Boundary Layer Meteorology', type: 'peer-reviewed', link: 'https://doi.org/10.1007/s10546-024-00864-y' },
  { authors: 'Luojus, K., & WMO GCW Snow Watch Team (incl. Fiddes, J.)', year: 2024, title: 'WMO GCW Snow Assessment for Winter 2023-2024, Northern Hemisphere and Regional Aspects', venue: 'WMO', type: 'report', link: 'https://globalcryospherewatch.org/snow-assessments-2024/' },
  { authors: 'WMO Global Cryosphere Watch', year: 2024, title: 'Status of the Monitoring of the Cryosphere in Central Asia', venue: 'WMO GCW Report No. 1', type: 'report', link: 'https://library.wmo.int/records/item/69490' },
  // 2023
  { authors: 'Filhol, S., Fiddes, J., & Aalstad, K.', year: 2023, title: 'TopoPyScale: A Python Package for Hillslope Climate Downscaling', venue: 'Journal of Open Source Software, 8(86)', type: 'peer-reviewed', link: 'https://doi.org/10.21105/joss.05202' },
  { authors: 'Martin, L.C.P., Westermann, S., Magni, M., Brun, F., Fiddes, J., et al.', year: 2023, title: 'Recent ground thermo-hydrological changes in a southern Tibetan endorheic catchment and implications for lake level changes', venue: 'Hydrology and Earth System Sciences, 27', type: 'peer-reviewed', link: 'https://doi.org/10.5194/hess-27-4409-2023' },
  { authors: 'Luojus, K., & WMO GCW Snow Watch Team (incl. Fiddes, J.)', year: 2023, title: 'WMO GCW Snow Assessment for Winter 2022-2023, Northern Hemisphere and Regional Aspects', venue: 'WMO', type: 'report', link: 'https://globalcryospherewatch.org/snow-assessments/' },
  // 2022
  { authors: 'Alonso-González, E., Aalstad, K., Baba, M.W., Revuelto, J., López-Moreno, J.I., Fiddes, J., et al.', year: 2022, title: 'The Multiple Snow Data Assimilation System (MuSA v1.0)', venue: 'Geoscientific Model Development, 15(24)', type: 'peer-reviewed', link: 'https://doi.org/10.5194/gmd-15-9127-2022' },
  { authors: 'Fiddes, J., Aalstad, K., & Lehning, M.', year: 2022, title: 'TopoCLIM: rapid topography-based downscaling of regional climate model output in complex terrain v1.1', venue: 'Geoscientific Model Development, 15', type: 'peer-reviewed', link: 'https://doi.org/10.5194/gmd-15-1753-2022' },
  { authors: 'Kronenberg, M., van Pelt, W., Machguth, H., Fiddes, J., Hoelzle, M., & Pertziger, F.', year: 2022, title: 'Long-Term Firn and Mass Balance Modelling for Abramov Glacier in the Data-Scarce Pamir Alay', venue: 'The Cryosphere, 16(12)', type: 'peer-reviewed', link: 'https://doi.org/10.5194/tc-16-5001-2022' },
  { authors: 'Kruyt, B., Mott, R., Fiddes, J., Gerber, F., Sharma, V., & Reynolds, D.', year: 2022, title: 'A Downscaling Intercomparison Study: The Representation of Slope-and Ridge-Scale Processes in Models of Different Complexity', venue: 'Frontiers in Earth Science, 10', type: 'peer-reviewed', link: 'https://doi.org/10.3389/feart.2022.789332' },
  { authors: 'Khanal, S., Nick, F., Fiddes, J., Kraaijenbrink, P., Immerzeel, W., & Hunink, J.E.', year: 2022, title: 'Present-day and Future Changes in the Hydrology of the Bhagirathi Basin', venue: 'FutureWater Report 252', type: 'report', link: 'https://www.futurewater.eu/projects/development-of-a-glacio-hydrological-model-and-iwrm-plan-for-the-uttarakhand-subbasin-in-india/' },
  { authors: 'Bellprat, O., Spirig, C., Flubacher, M., Grandjean, J., Roulet, Y.-A., Moret, L., Bavay, M., Fiddes, J., et al.', year: 2022, title: 'A low-cost approach to develop Weather, Water and Climate Services (WWCS) in rural areas of Tajikistan', venue: 'EMS Annual Meeting 2022, Bonn', type: 'report' },
  { authors: 'Bavay, M., Fiddes, J., Fierz, C., Lehning, M., Monti, F., & Egger, T.', year: 2022, title: 'The MeteoIO pre-processing library for operational applications', venue: 'Proceedings, International Snow Science Workshop, Innsbruck', type: 'report' },
  // 2021
  { authors: 'Shugar, D.H., et al.', year: 2021, title: 'A massive rock and ice avalanche caused the 2021 disaster at Chamoli, Indian Himalaya', venue: 'Science, 373(6552)', type: 'peer-reviewed', link: 'https://doi.org/10.1126/science.abh4455' },
  { authors: 'Allen, S., Frey, H., & Fiddes, J.', year: 2021, title: 'Assessment of Contributing Factors of the May 2021 Disasters in Tajikistan', venue: 'PreventionWeb', type: 'report', link: 'https://www.preventionweb.net/publication/assessment-contributing-factors-may-2021-disasters-tajikistan-forensic-study-under' },
  // 2020
  { authors: 'Barandun, M., Fiddes, J., Scherler, M., Mathys, T., Saks, T., Petrakov, D., & Hoelzle, M.', year: 2020, title: 'The State and Future of the Cryosphere in Central Asia', venue: 'Water Security, 11', type: 'peer-reviewed', link: 'https://doi.org/10.1016/j.wasec.2020.100072' },
  { authors: 'Bavay, M., Fiddes, J., & Godøy, Ø.', year: 2020, title: 'Automatic Data Standardization for the Global Cryosphere Watch Data Portal', venue: 'Data Science Journal, 19(1)', type: 'peer-reviewed', link: 'https://doi.org/10.5334/dsj-2020-006' },
  { authors: 'Bender, E., Lehning, M., & Fiddes, J.', year: 2020, title: 'Changes in Climatology, Snow Cover, and Ground Temperatures at High Alpine Locations', venue: 'Frontiers in Earth Science, 8', type: 'peer-reviewed', link: 'https://doi.org/10.3389/feart.2020.00100' },
  { authors: 'Philipson, C.D., Cutler, M.E.J., Brodrick, P.G., Asner, G.P., Boyd, D.S., Costa, P.M., Fiddes, J., et al.', year: 2020, title: 'Active Restoration Accelerates the Carbon Recovery of Human-Modified Tropical Forests', venue: 'Science, 369(6505)', type: 'peer-reviewed', link: 'https://doi.org/10.1126/science.aay4490' },
  // 2019
  { authors: 'Fiddes, J., Aalstad, K., & Westermann, S.', year: 2019, title: 'Hyper-resolution ensemble-based snow reanalysis in mountain regions using clustering', venue: 'Hydrology and Earth System Sciences, 23', type: 'peer-reviewed', link: 'https://doi.org/10.5194/hess-23-1-2019' },
  { authors: 'Hoelzle, M., Barandun, M., Bolch, T., Fiddes, J., Gafurov, A., Muccione, V., Saks, T., & Shaghedanova, M.', year: 2019, title: 'The Status and Role of the alpine Cryosphere in Central Asia', venue: 'The Aral Sea Basin: Water for Sustainable Development in Central Asia, Routledge', type: 'book', link: 'https://doi.org/10.4324/9780429436475-8' },
  { authors: 'Muccione, V., & Fiddes, J.', year: 2019, title: 'State of the Knowledge on Water Resources and Natural Hazards under Climate Change in Central Asia and South Caucasus', venue: 'Managing Disaster Risks and Water under Climate Change', type: 'report' },
  { authors: 'Muccione, V., Huggel, C., Salzmann, N., Fiddes, J., Nussbaumer, S.U., Novikov, V., & Hughes, G.', year: 2019, title: 'Climate-cryosphere-water nexus: Central Asia outlook', venue: 'Zoï Environment Network', type: 'report' },
  // 2016
  { authors: 'Allen, S.K., Fiddes, J., Linsbauer, A., Randhawa, S.S., & Salzmann, N.', year: 2016, title: 'Indo-Swiss partnership initiates first local permafrost studies in the Indian Himalaya', venue: 'Current Science, 111(3)', type: 'peer-reviewed', link: 'https://doi.org/10.18520/cs/v111/i3/550-553' },
  // 2015
  { authors: 'Fiddes, J., Endrizzi, S., & Gruber, S.', year: 2015, title: 'Large-area land surface simulations in heterogeneous terrain driven by global data sets: application to mountain permafrost', venue: 'The Cryosphere, 9', type: 'peer-reviewed', link: 'https://doi.org/10.5194/tc-9-411-2015' },
  // 2014
  { authors: 'Fiddes, J., & Gruber, S.', year: 2014, title: 'TopoSCALE v.1.0: downscaling gridded climate data in complex terrain', venue: 'Geoscientific Model Development, 7', type: 'peer-reviewed', link: 'https://doi.org/10.5194/gmd-7-387-2014' },
  { authors: 'Fiddes, J.T.', year: 2014, title: 'Subgrid Simulation of Land Surface Variables in Heterogeneous and Remote Environments: Application to Mountain Permafrost', venue: 'Doctoral dissertation, ETH Zurich', type: 'thesis', link: 'https://www.zora.uzh.ch/id/eprint/105313/' },
  // 2013
  { authors: 'Habib, H., Anceno, A.J., Fiddes, J., Beekma, J., Ilyuschenko, M., Nitivattananon, V., & Shipin, O.V.', year: 2013, title: 'Jumpstarting post-conflict strategic water resources protection from a changing global perspective: Gaps and prospects in Afghanistan', venue: 'Journal of Environmental Management, 129', type: 'peer-reviewed', link: 'https://doi.org/10.1016/j.jenvman.2013.07.019' },
  // 2012
  { authors: 'Fiddes, J., & Gruber, S.', year: 2012, title: 'TopoSUB: a tool for efficient large area numerical modelling in complex topography at sub-grid scales', venue: 'Geoscientific Model Development, 5', type: 'peer-reviewed', link: 'https://doi.org/10.5194/gmd-5-1245-2012' },
  { authors: 'Schmid, M.-O., Gubler, S., Fiddes, J., & Gruber, S.', year: 2012, title: 'Inferring snow pack ripening and melt out from distributed ground surface temperature measurements', venue: 'The Cryosphere, 6', type: 'peer-reviewed', link: 'https://doi.org/10.5194/tc-6-1127-2012' },
  // 2011
  { authors: 'Gubler, S., Fiddes, J., Keller, M., & Gruber, S.', year: 2011, title: 'Scale-dependent measurement and analysis of ground surface temperature variability in alpine terrain', venue: 'The Cryosphere, 5(2)', type: 'peer-reviewed', link: 'https://doi.org/10.5194/tc-5-431-2011' },
  { authors: 'Beekma, J., & Fiddes, J.', year: 2011, title: 'Floods and droughts: The Afghan water paradox', venue: 'Afghanistan Human Development Report 2011', type: 'report', link: 'https://www.researchgate.net/publication/263506846_Floods_and_droughts_The_Afghan_water_paradox' },
  // 2010
  { authors: 'Keller, M., Hungerbuehler, G., Knecht, O., Sheikh, S., Beutel, J., Gubler, S., Fiddes, J., & Gruber, S.', year: 2010, title: 'iAssist: rapid deployment and maintenance of tiny sensing systems', venue: 'Proceedings of the 8th ACM Conference on Embedded Networked Sensor Systems (SenSys \'10)', type: 'peer-reviewed', link: 'https://doi.org/10.1145/1869983.1870043' },
  { authors: 'Fiddes, J.', year: 2010, title: 'Climbs and expeditions: Asia, Afghanistan, Hindu Kush, Koh-i-Beefy', venue: 'American Alpine Journal, 52(84)', type: 'report', link: 'https://publications.americanalpineclub.org/articles/12201025500/Koh-i-Beefy-ca-5400m' },
  // 2007
  { authors: 'Fiddes, J.', year: 2007, title: 'Afghanistan: Implications Of Climate Change For Water Resources In The Kunduz River Basin', venue: 'Climate Challenges: Bridging the Knowledge Gap, Mercy Corps', type: 'report', link: 'https://www.mercycorps.org/files/file1198714955.pdf' },

  // === Simon Allen publications ===
  // 2025
  { authors: 'Niggli, L., Frey, H., Allen, S., Alybaeva, N., Huggel, C., Moldobekov, B., & Zaginaev, V.', year: 2025, title: 'Modelling the effectiveness of GLOF DRM measures – a case study from the Ala-Archa valley, Kyrgyz Republic', venue: 'EGUsphere [preprint]', type: 'peer-reviewed', link: 'https://doi.org/10.5194/egusphere-2025-290' },
  { authors: 'Sattar, A., Cook, K., Rai, S.K., Berthier, E., Allen, S.K., Rinzen, S., et al.', year: 2025, title: 'The Sikkim flood of October 2023: Drivers, causes and impacts of a multihazard cascade', venue: 'Science', type: 'peer-reviewed', link: 'https://doi.org/10.1126/science.ads2659' },
  // 2024
  { authors: 'Zhong, Y., Allen, S.K., Li, D., Corona, C., Zheng, G., Liu, Q., & Stoffel, M.', year: 2024, title: 'Unravelling driving conditions of rock and ice avalanches and resulting cascading processes in High Mountain Asia', venue: 'Landslides', type: 'peer-reviewed', link: 'https://doi.org/10.1007/s10346-024-02421-7' },
  { authors: 'Khadka, N., Zheng, G., Chen, X., Zhong, Y., Allen, S., & Gouli, M.R.', year: 2024, title: 'An ice-snow avalanche triggered small glacial lake outburst flood in Birendra Lake, Nepal Himalaya', venue: 'Natural Hazards', type: 'peer-reviewed', link: 'https://doi.org/10.1007/s11069-024-07014-0' },
  { authors: 'Wang, X., Zhang, G., Veh, G., Sattar, A., Wang, W., Allen, S.K., Bolch, T., Peng, M., & Xu, F.', year: 2024, title: 'Reconstructing glacial lake outburst floods in the Poiqu River basin, central Himalaya', venue: 'Geomorphology, 449, 109063', type: 'peer-reviewed' },
  { authors: 'Zhong, Y., Allen, S.K., Zheng, G., Liu, Q., & Stoffel, M.', year: 2024, title: 'Large rock and ice avalanches frequently produce cascading processes in High Mountain Asia', venue: 'Geomorphology, 449, 109048', type: 'peer-reviewed' },
  { authors: 'Colavitto, B., Allen, S., Winocur, D., Dussaillant, A., Guillet, S., Muñoz-Torrero Manchado, A., Gorsic, S., & Stoffel, M.', year: 2024, title: 'A glacial lake outburst floods hazard assessment in the Patagonian Andes combining inventory data and case-studies', venue: 'Science of The Total Environment, 916, 169703', type: 'peer-reviewed' },
  // 2023
  { authors: 'Vaghefi, S.A., Stammbach, D., Muccione, V., Bingler, J., Ni, J., Kraus, M., Allen, S., et al.', year: 2023, title: 'ChatClimate: Grounding conversational AI in climate science', venue: 'Communications Earth & Environment, 4(1), 480', type: 'peer-reviewed' },
  { authors: 'Mani, P., Allen, S., Evans, S.G., Kargel, J.S., Mergili, M., Petrakov, D., & Stoffel, M.', year: 2023, title: 'Geomorphic process chains in high-mountain regions — A review and classification approach for natural hazards assessment', venue: 'Reviews of Geophysics, 61, e2022RG000791', type: 'peer-reviewed' },
  { authors: 'Baral, P., Allen, S., Steiner, J.F., Gurung, T.R., & McDowell, G.', year: 2023, title: 'Climate change impacts and adaptation to permafrost change in High Mountain Asia: a comprehensive review', venue: 'Environmental Research Letters, 18(9), 093005', type: 'peer-reviewed' },
  { authors: 'Peng, M., Wang, X., Zhang, G., Veh, G., Sattar, A., Chen, W., & Allen, S.', year: 2023, title: 'Cascading hazards from two recent glacial lake outburst floods in the Nyainqêntanglha range, Tibetan Plateau', venue: 'Journal of Hydrology, 130155', type: 'peer-reviewed' },
  { authors: 'Dubey, S., Sattar, A., Goyal, M.K., Allen, S., Frey, H., Haritashya, U.K., & Huggel, C.', year: 2023, title: 'Mass movement hazard and exposure in the Himalaya', venue: "Earth's Future, 11, e2022EF003253", type: 'peer-reviewed' },
  { authors: 'Sattar, A., Allen, S., Mergili, M., Haeberli, W., Frey, H., Kulkarni, A.V., et al.', year: 2023, title: 'Modeling Potential Glacial Lake Outburst Flood Process Chains and Effects From Artificial Lake-Level Lowering at Gepang Gath Lake, Indian Himalaya', venue: 'Journal of Geophysical Research: Earth Surface, 128(3), e2022JF006826', type: 'peer-reviewed' },
  { authors: 'Chen, N., Liu, M., Allen, S.K., Deng, M., Khanal, N.R., Peng, T., et al.', year: 2023, title: 'Small outbursts into big disasters: Earthquakes exacerbate climate-driven cascade processes of the glacial lakes failure in the Himalayas', venue: 'Geomorphology, 422, 108539', type: 'peer-reviewed' },
  { authors: 'Nepal, S., Steiner, J.F., Allen, S.K., Azam, M.F., et al.', year: 2023, title: 'Consequences of cryospheric change for water resources and hazards in the Hindu Kush Himalaya', venue: 'ICIMOD Water, ice, society, and ecosystems in the Hindu Kush Himalaya: An outlook, pp. 73–121', type: 'book' },
  // 2022
  { authors: 'Allen, S.K., Sattar, A., King, O., Zhang, G., Bhattacharya, A., Yao, T., & Bolch, T.', year: 2022, title: 'Glacial lake outburst flood hazard under current and future conditions: worst-case scenarios in a transboundary Himalayan basin', venue: 'Natural Hazards and Earth System Sciences, 22(11), 3765–3785', type: 'peer-reviewed' },
  { authors: 'Allen, S.K., Frey, H., Haeberli, W., Huggel, C., Chiarle, M., & Geertsema, M.', year: 2022, title: 'Assessment Principles for Glacier and Permafrost Hazards in Mountain Regions', venue: 'Oxford Research Encyclopedias: Natural Hazard Science', type: 'peer-reviewed', link: 'https://doi.org/10.1093/acrefore/9780199389407.013.356' },
  { authors: 'Pandey, P., Ali, S.N., Allen, S.K.', year: 2022, title: 'Rock glacier Oasis: An alternative for agro-pastoralism in a changing environment in the Himalayan cold desert', venue: 'Geographical Journal, 188(2)', type: 'peer-reviewed', link: 'https://doi.org/10.1111/geoj.12468' },
  { authors: 'Emmer, A., Allen, S.K., Carey, M., Frey, H., Huggel, C., Korup, O., et al.', year: 2022, title: 'Progress and challenges in glacial lake outburst flood research (2017–2021): a research community perspective', venue: 'Natural Hazards and Earth System Sciences, 22(9), 3041–3061', type: 'peer-reviewed' },
  { authors: 'Muñoz-Torrero Manchado, A., Ballesteros-Cánovas, J., Allen, S., & Stoffel, M.', year: 2022, title: 'Deforestation controls landslide susceptibility in Far-Western Nepal', venue: 'CATENA, 219, 106627', type: 'peer-reviewed' },
  { authors: 'Dhote, P.R., Thakur, P.K., Chouksey, A., Srivastav, S.K., et al., Allen, S.K., Stoffel, M., et al.', year: 2022, title: 'Synergistic analysis of satellite, unmanned aerial vehicle, terrestrial laser scanner data and process-based modelling for understanding the dynamics and morphological changes around the snout of Gangotri Glacier, India', venue: 'Geomorphology, 396', type: 'peer-reviewed', link: 'https://doi.org/10.1016/j.geomorph.2021.108005' },
  // 2021
  { authors: 'Zheng, G., Allen, S.K., Bao, A., Ballesteros-Cánovas, J.A., Huss, M., Zhang, G., et al.', year: 2021, title: 'Increasing risk of glacial lake outburst floods from future Third Pole deglaciation', venue: 'Nature Climate Change, 11, 411–417', type: 'peer-reviewed' },
  { authors: 'Manchado, A.M-T., Allen, S.K., Ballesteros-Cánovas, J.A., Dhakal, A., Dhital, M.R., & Stoffel, M.', year: 2021, title: 'Three decades of landslide activity in western Nepal: New insights into trends and climate drivers', venue: 'Landslides', type: 'peer-reviewed', link: 'https://doi.org/10.1007/s10346-021-01632-6' },
  { authors: 'Sattar, A., Goswami, A., Kulkarni, A.V., Emmer, A., Haritashya, U.K., Allen, S., Frey, H., & Huggel, C.', year: 2021, title: 'Future Glacial Lake Outburst Flood (GLOF) hazard of the South Lhonak Lake, Sikkim Himalaya', venue: 'Geomorphology, 388, 107783', type: 'peer-reviewed' },
  { authors: 'Mal, S., Allen, S., Frey, H., Huggel, C., & Dimri, A.P.', year: 2021, title: 'Sector-wise assessment of Glacial Lake Outburst Flood danger in the Indian Himalayan Region', venue: 'Mountain Research and Development, 41(1)', type: 'peer-reviewed', link: 'https://doi.org/10.1659/MRD-JOURNAL-D-20-00043.1' },
  { authors: 'Zheng, G., Mergili, M., Emmer, A., Allen, S.K., Bao, A., Guo, H., & Stoffel, M.', year: 2021, title: 'The 2020 glacial lake outburst flood at Jinwuco, Tibet: causes, impacts, and implications for hazard and risk assessment', venue: 'The Cryosphere, 15, 3159–3180', type: 'peer-reviewed' },
  { authors: 'Dimri, A.P., Allen, S., Huggel, C., Mal, S., Ballesteros-Cánovas, J.A., et al.', year: 2021, title: 'Climate change, cryosphere and impacts in the Indian Himalayan Region', venue: 'Current Science, 120, 5, 774–790', type: 'peer-reviewed' },
  { authors: 'Zheng, G., Bao, A., Allen, S., Antonio Ballesteros-Cánovas, J., Yuan, Y., Jiapaer, G., & Stoffel, M.', year: 2021, title: 'Numerous unreported glacial lake outburst floods in the Third Pole revealed by high-resolution satellite data and geomorphological evidence', venue: 'Science Bulletin', type: 'peer-reviewed', link: 'https://doi.org/10.1016/j.scib.2021.01.014' },
  // 2020
  { authors: 'Majeed, U., Rashid, I., Sattar, A., Allen, S., Stoffel, M., Nüsser, M., & Schmidt, S.', year: 2020, title: 'Recession of Gya Glacier and the 2014 glacial lake outburst flood in the Trans-Himalayan region of Ladakh, India', venue: 'Science of the Total Environment, 756, 144008', type: 'peer-reviewed', link: 'https://doi.org/10.1016/j.scitotenv.2020.144008' },
  { authors: 'Chen, F., Zhang, M., Guo, H., Allen, S.K., Kargel, J.S., Haritashya, U.K., & Watson, C.S.', year: 2020, title: 'Annual 30-meter Dataset for Glacial Lakes in High Mountain Asia from 2008 to 2017', venue: 'Earth System Science Data, 13, 741–766', type: 'peer-reviewed' },
  { authors: 'Emmer, A., Harrison, S., Mergili, M., Allen, S., Frey, H., & Huggel, C.', year: 2020, title: '70 years of lake evolution and glacial lake outburst floods in the Cordillera Blanca (Peru) and implications for the future', venue: 'Geomorphology, 365, 107178', type: 'peer-reviewed', link: 'https://doi.org/10.1016/j.geomorph.2020.107178' },
  { authors: 'Ballesteros-Cánovas, J.A., Koul, T., Bashir, A., del Pozo, J.M.B., Allen, S., et al.', year: 2020, title: 'Recent flood hazards in Kashmir put into context with millennium-long historical and tree-ring records', venue: 'Science of the Total Environment, 722, 137875', type: 'peer-reviewed', link: 'https://doi.org/10.1016/j.scitotenv.2020.137875' },
  { authors: 'Allen, S.K., Rodriguez, L.M., Iwanciw, J.G., Boko, M.J., Brusa, F., Grunwaldt, A.H.', year: 2020, title: 'Building transformative institutional adaptive capacity: Assessing the potential contribution of PPCR to building a climate-resilient water governance framework in Bolivia', venue: 'Inter-American Development Bank, Washington DC', type: 'report', link: 'http://dx.doi.org/10.18235/0002226' },
  // 2019
  { authors: 'Allen, S.K., Zhang, G., Wang, W., Yao, T., & Bolch, T.', year: 2019, title: 'Potentially dangerous glacial lakes across the Tibetan Plateau revealed using a large-scale automated assessment approach', venue: 'Science Bulletin, 64(7), 435–445', type: 'peer-reviewed' },
  { authors: 'Zhang, G., Bolch, T., Allen, S., Linsbauer, A., Chen, W., & Wang, W.', year: 2019, title: 'Glacial lake evolution and glacier–lake interactions in the Poiqu River basin, central Himalaya, 1964–2017', venue: 'Journal of Glaciology, 1–19', type: 'peer-reviewed' },
  // 2018
  { authors: 'Allen, S.K., Ballesteros-Cánovas, J.A., Randhawa, S.S., Singha, A.K., Huggel, C., & Stoffel, M.', year: 2018, title: 'Translating the concept of climate risk into an assessment framework to inform adaptation planning: Insights from a pilot study of flood risk in Himachal Pradesh, Northern India', venue: 'Environmental Science and Policy, 87, 1–10', type: 'peer-reviewed', link: 'https://doi.org/10.1016/j.envsci.2018.05.013' },
  { authors: 'Muccione, V., Orlowsky, B., Allen, S.K., Huggel, C., Salzmann, N., Montoya, N., et al.', year: 2018, title: 'Climate change research in bilateral development programmes: experiences from India and Peru', venue: 'Development in Practice', type: 'peer-reviewed', link: 'https://doi.org/10.1080/09614524.2018.1559799' },
  { authors: 'Iribarren Anacona, P., Norton, K., Mackintosh, A., Escobar, F., Allen, S.K., et al.', year: 2018, title: 'Dynamics of an outburst flood originating from a small and high-altitude glacier in the Arid Andes of Chile', venue: 'Natural Hazards, 94(1), 93–119', type: 'peer-reviewed' },
  // 2017
  { authors: 'Paul, J.D., Buytaert, W., Allen, S.K., Ballesteros-Cánovas, J.A., et al.', year: 2017, title: 'Citizen science for hydrological risk reduction and resilience building', venue: 'WIREs Water', type: 'peer-reviewed', link: 'https://doi.org/10.1002/wat2.1262' },
  { authors: 'GAPHAZ', year: 2017, title: 'Assessment of Glacier and Permafrost Hazards in Mountain Regions – Technical Guidance Document', venue: 'Prepared by Allen, S.K., Frey, H., Huggel, C., et al. Standing Group on Glacier and Permafrost Hazards in Mountains (GAPHAZ)', type: 'report' },
  // 2016
  { authors: 'Muccione, V., Allen, S.K., Huggel, C., & Birkmann, J.', year: 2016, title: 'Differentiating regions for adaptation financing: the role of global vulnerability and risk distributions', venue: 'Wiley Interdisciplinary Reviews: Climate Change, 8', type: 'peer-reviewed', link: 'https://doi.org/10.1002/wcc.447' },
  { authors: 'Ruiz-Villanueva, V., Allen, S.K., Arora, M., Goel, N.K., & Stoffel, M.', year: 2016, title: 'Recent catastrophic landslide lake outburst floods in the Himalayan Mountain Range', venue: 'Progress in Physical Geography', type: 'peer-reviewed', link: 'https://doi.org/10.1177/0309133316658614' },
  { authors: 'Allen, S.K., Linsbauer, A., Randhawa, S.S., Huggel, C., Rana, P., & Kumari, A.', year: 2016, title: 'Glacial lake outburst flood risk in Himachal Pradesh, India: an integrative and anticipatory approach considering current and future threats', venue: 'Natural Hazards, 84', type: 'peer-reviewed', link: 'https://doi.org/10.1007/s11069-016-2511-x' },
  // 2015
  { authors: 'Allen, S.K., Rastner, P., Arora, M., Huggel, C., & Stoffel, M.', year: 2015, title: 'Lake outburst and debris flow disaster at Kedarnath, June 2013: Hydrometeorological triggering, and topographic predisposition', venue: 'Landslides, 13, 1479–1491', type: 'peer-reviewed' },
  { authors: 'Linsbauer, A., Frey, H., Haeberli, W., Machgurth, H., Azam, M.F., Allen, S.K.', year: 2015, title: 'Modelling glacier-bed overdeepenings and possible future lakes for the glaciers in the Himalaya-Karakoram region', venue: 'Annals of Glaciology, 57, 119–130', type: 'peer-reviewed' },
  { authors: 'Cox, S.C., McSaveney, M.J., Spencer, J., Allen, S.K., et al.', year: 2015, title: 'Rock avalanche on 14 July 2014 from Hillary Ridge, Aoraki/Mount Cook, New Zealand', venue: 'Landslides', type: 'peer-reviewed', link: 'https://doi.org/10.1007/s10346-015-0556-7' },
  // 2013
  { authors: 'Allen, S.K., & Huggel, C.', year: 2013, title: 'Extremely warm temperatures as a potential cause of recent high mountain rockfall', venue: 'Global and Planetary Change, 107, 59–69', type: 'peer-reviewed' },
  // IPCC reports
  { authors: 'IPCC', year: 2013, title: 'Climate Change 2013: The Physical Science Basis. Contribution of Working Group I to the Fifth Assessment Report', venue: 'Cambridge University Press. [S.K. Allen as Senior Science Officer, Technical Support Unit]', type: 'report' },
  { authors: 'IPCC', year: 2012, title: 'Managing the Risks of Extreme Events and Disasters to Advance Climate Change Adaptation (SREX)', venue: 'Cambridge University Press. [S.K. Allen as editor and contributing author]', type: 'report' },
  // 2011
  { authors: 'Allen, S.K., Cox, S.C., & Owens, I.F.', year: 2011, title: 'Rock avalanches and other landslides in the central Southern Alps of New Zealand: a regional study considering potential climate change impacts', venue: 'Landslides, 8, 33–48', type: 'peer-reviewed' },
  // 2009
  { authors: 'Allen, S.K., Gruber, S., & Owens, I.F.', year: 2009, title: 'Exploring steep bedrock permafrost and its relationship with recent slope failures in the Southern Alps of New Zealand', venue: 'Permafrost and Periglacial Processes, 20, 345–356', type: 'peer-reviewed' },
  { authors: 'Allen, S.K., Schneider, D., & Owens, I.F.', year: 2009, title: 'First approaches towards modelling glacial hazards in the Mount Cook region of New Zealand\'s Southern Alps', venue: 'Natural Hazards and Earth System Sciences, 9, 481–499', type: 'peer-reviewed' },
  // 2008
  { authors: 'Allen, S.K., Owens, I.F., & Sirguey, P.', year: 2008, title: 'Satellite remote sensing procedures for glacial terrain analyses and hazard assessment in the Aoraki Mount Cook region, New Zealand', venue: 'New Zealand Journal of Geology and Geophysics, 51, 73–87', type: 'peer-reviewed' },
]

const typeLabels: Record<string, string> = {
  'peer-reviewed': 'Peer-reviewed',
  report: 'Report',
  book: 'Book chapter',
  thesis: 'Thesis',
  policy: 'Policy note',
}

const typeColors: Record<string, string> = {
  'peer-reviewed': 'var(--unframer-mf-cyan, #35E4E4)',
  report: 'var(--unframer-accent-blue, #B9FFFF)',
  book: '#D5F0A3',
  thesis: '#a78bfa',
  policy: '#fbbf24',
}

export default function Publications() {
  const [filter, setFilter] = useState<string>('all')

  const types = ['all', ...Object.keys(typeLabels)]
  const filtered = filter === 'all' ? allPublications : allPublications.filter(p => p.type === filter)

  // Group by year
  const byYear: Record<number, Publication[]> = {}
  for (const p of filtered) {
    if (!byYear[p.year]) byYear[p.year] = []
    byYear[p.year].push(p)
  }
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  return (
    <>
      <section
        className="w-full flex flex-col items-center"
        style={{
          backgroundColor: '#F5F5F5',
          padding: '160px 16px 80px 16px',
        }}
      >
        <div className="w-full max-w-[1200px]">
          {/* Header */}
          <div style={{ paddingBottom: '40px' }}>
            <div className="max-w-[700px] flex flex-col gap-[24px]">
              <Label text="Publications" />
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '1.14rem',
                  lineHeight: '1.35em',
                  letterSpacing: '-0.03em',
                  color: 'var(--unframer-forrest)',
                }}
              >
                Peer-reviewed articles, reports, and book chapters from the Mountain Futures team.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-[8px]" style={{ paddingBottom: '40px' }}>
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: '13px',
                  letterSpacing: '-0.03em',
                  padding: '6px 14px',
                  borderRadius: '0px',
                  border: '1px solid',
                  borderColor: filter === t ? 'var(--unframer-forrest)' : 'var(--unframer-neutral-300)',
                  backgroundColor: filter === t ? 'var(--unframer-forrest)' : 'transparent',
                  color: filter === t ? '#fff' : 'var(--unframer-forrest)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {t === 'all' ? `All (${allPublications.length})` : `${typeLabels[t]} (${allPublications.filter(p => p.type === t).length})`}
              </button>
            ))}
          </div>

          {/* Publications by year */}
          <div className="flex flex-col">
            {years.map(year => (
              <div key={year}>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: '28px',
                    letterSpacing: '-0.05em',
                    color: 'var(--unframer-forrest)',
                    padding: '32px 0 16px 0',
                    borderBottom: '1px solid var(--unframer-neutral-300)',
                  }}
                >
                  {year}
                </div>
                {byYear[year].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '20px 0',
                      borderBottom: '1px solid var(--unframer-neutral-200, #e4e4e4)',
                    }}
                  >
                    <div className="flex items-start gap-[12px]">
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '11px',
                          fontWeight: 400,
                          letterSpacing: '-0.02em',
                          padding: '3px 8px',
                          backgroundColor: typeColors[p.type] || '#e4e4e4',
                          color: 'var(--unframer-forrest)',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {typeLabels[p.type] || p.type}
                      </span>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            lineHeight: '1.55em',
                            letterSpacing: '-0.03em',
                            fontWeight: 500,
                          }}
                        >
                          {p.link ? (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'var(--unframer-neutral-300)', textUnderlineOffset: '3px' }}
                              onMouseEnter={e => { e.currentTarget.style.textDecorationColor = 'var(--unframer-mf-cyan, #35E4E4)' }}
                              onMouseLeave={e => { e.currentTarget.style.textDecorationColor = 'var(--unframer-neutral-300)' }}
                            >
                              {p.title}
                            </a>
                          ) : p.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            lineHeight: '1.55em',
                            letterSpacing: '-0.03em',
                            color: 'var(--unframer-neutral-400)',
                            marginTop: '4px',
                          }}
                        >
                          {p.authors}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            lineHeight: '1.55em',
                            letterSpacing: '-0.03em',
                            fontStyle: 'italic',
                            color: 'var(--unframer-neutral-400)',
                          }}
                        >
                          {p.venue}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
