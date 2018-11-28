---
layout: page
title: Tools
tags: [about, Jekyll, theme, responsive]
modified: 2014-08-08T20:53:07.573882-04:00
comments: true
share: false
image:
  feature: sample-image-2.png
  credit: WeGraphics
  creditlink: http://wegraphics.net/downloads/free-ultimate-blurred-background-pack/
---
{% include _toc.html %}

<!--Tools I developed, contributed to or use in my work-->
Here are tools I use in my work, either authored by me, contributions to development or just a user. They are all available under opensource licensing, documented by publications and with nice open communities behind them.

### TOPOSUB

R package for landscape clustering and land-surface modelling

- preprocessing (landscape clustering, running LSM in parallel)
- postprocessing (read output, mapping)
- data analysis (specific variable postprocessing, e.g. drought indices)

TopoSUB is a R project for sampling the most important aspects of land surface heterogeneity through a lumped scheme, allowing for the application of numerical land surface models (LSMs), like e.g. GEOtop, over large areas in mountain regions or other heterogeneous environments (Fiddes et al. 2012). The project was initiated by Joel Fiddes, the source code is available via the toposub GitHub sitory.


<figure>
  <img src="{{ site.url }}{{ site.baseurl }}/images/toposub_samples.png" alt="">
  <figcaption>A simplified example of multidimensional sampling used by TopoSUB. The heterogeneous subgrid is grouped into samples S1-5 according to three dimensions P1-3 which define the parameter space (3-D cube). Colour represents sample membership, shade of colour symbolises within sample variation with respect to P1-3. This method generalises to higher sample numbers, more highly resolved subgrids and higher orders of dimensionality.</figcaption>
</figure> 

#### Code/packages

<a href="https://github.com/joelfiddes/toposub" class="author-social" target="_blank"><i class="fa fa-fw fa-github"></i> Github </a>
<a href="https://github.com/JBrenn/TopoSUB" class="author-social" target="_blank"><i class="fa fa-fw fa-github"></i> Github  (R-package)</a>


#### References
<a href="http://dx.doi.org/10.5194/gmd-5-1245-2012" class="author-social" target="_blank"><i class="fa-file-text-o"></i>  Fiddes, J. & Gruber, S. 2012: TopoSUB: a tool for efficient large area numerical modelling in complex topography at sub-grid scales, Geoscientific Model Development, 5, 1245–1257,10.5194/gmd-5-1245-2012.</a>
<a href="http://dx.doi.org/10.5194/tc-9-411-2015" class="author-social" target="_blank"><i class="fa-file-text-o"></i> Fiddes, J., Endrizzi, S., and Gruber, S.: Large-area land surface simulations in heterogeneous terrain driven by global data sets: application to mountain permafrost, The Cryosphere, 9, 411-426, doi:10.5194/tc-9-411-2015, 2015.</a>

---

### TOPOSCALE
TopoSCALE is a downscaling tool for atmospheric (3D) model output in complex terrain. The method makes use of an interpolation of pressure-level data according to topographic height of the subgrid. An elevation and topography correction is used to downscale short-wave radiation. Long-wave radiation is downscaled by deriving a cloud-component of all-sky emissivity at grid level and using downscaled temperature and relative humidity fields to describe variability with elevation. Precipitation is downscaled with a simple non-linear lapse and optionally disaggregated using a climatology approach.


<figure>
  <img src="{{ site.url }}{{ site.baseurl }}/images/tscale.png" alt="">
  <figcaption>A schematic of the TopoSCALE method.</figcaption>
</figure> 

#### Code/packages

<a href="https://github.com/joelfiddes/toposcale" class="author-social" target="_blank"><i class="fa fa-fw fa-github"></i> Github </a>


#### References

<a href="http://dx.doi.org/10.5194/gmd-7-387-2014" class="author-social" target="_blank"><i class="fa-file-text-o"></i>   Fiddes, J. & Gruber, S. 2014: TopoSCALE v.1.0: downscaling gridded climate data in complex terrain, Geoscientific Model Development, 7, 387-405, doi:10.5194/gmd-7-387-2014.</a>
<a href="http://dx.doi.org/10.5194/tc-9-411-2015" class="author-social" target="_blank"><i class="fa-file-text-o"></i> Fiddes, J., Endrizzi, S., and Gruber, S.: Large-area land surface simulations in heterogeneous terrain driven by global data sets: application to mountain permafrost, The Cryosphere, 9, 411-426, doi:10.5194/tc-9-411-2015, 2015.</a>

---

### GEOTOP

GEOtop is a distributed model of the mass and energy balance of the
hydrological cycle, which is applicable to simulations in continuum in
small catchments. GEOtop deals with the effects of topography on the
interaction between energy balance and hydrological cycle with peculiar
solutions.

#### Code/packages
<a href="http://abouthydrology.blogspot.it/2015/02/geotop-essentials.html" class="author-social" target="_blank"><i class="fa-file-text-o"></i> Documentation</a>
<a href="https://github.com/geotopmodel/geotop" class="author-social" target="_blank"><i class="fa fa-fw fa-github"></i> Github </a>


#### References
Endrizzi, S., Gruber, S., Dall'Amico, M., and Rigon, R. 2014: GEOtop 2.0: simulating the combined energy and water balance at and below the land surface accounting for soil freezing, snow cover and terrain effects, Geosci. Model Dev., 7, 2831-2857,
<a href="http://dx.doi.org/10.5194/gmd-7-2831-2014">10.5194/gmd-7-2831-2014</a>

---
<!--
### GSN
Global sensor networks (GSN) is a software middleware designed to facilitate the deployment and programming of sensor networks.

<a href="https://github.com/cryos-epfl/gsn" class="author-social" target="_blank"><i class="fa fa-fw fa-github"></i> Github </a>
-->
---

### OSPER
Open support platform for environmental research (OSPER) built around GSN that enables management and storage of online sensor data and metadata management.

<a href="https://www.osper.ch" class="author-social" target="_blank"><i class="fa fa-fw fa-database"></i> Web platform</a>
<a href="http://www.osper.ch/#/plot?onlyPublic=false&group=wfj&sensors=wfj_vf_imis&parameters=hs1,ta&rowNumber=100" class="author-social" target="_blank"><i class="fa fa-fw fa-bar-chart"></i> Current snow depth and air temperature at the Weissfluhjoch, Davos, 2540m asl</a>
<a href="http://www.slf.ch/fragment/chart.html?station=WFJ2&type=temp&lang=en" class="author-social" target="_blank"><i class="fa fa-fw fa-bar-chart"></i> Current snow surface and air temperature at the Weissfluhjoch, Davos, 2540m asl</a>

---

### METEOIO
The MeteoIO library aims at making data access easy and safe for numerical simulations in environmental sciences requiring general meteorological data. MeteoIO's main design goals are:

- providing data format/protocol independent data access
- providing safe and robust I/O
- making I/O code as unobtrusive and simple as possible for the user
- providing ready to use data to the user, which means transparent caching, filtering, resampling, spatial interpolation.
- enabling unattended use from an IO point of view
- offering high modularity

#### Reference
MeteoIO in Bavay, M. and Egger, T., "MeteoIO 2.4.2: a preprocessing library for meteorological data", Geosci. Model Dev., 7, 3135-3151, doi:10.5194/gmd-7-3135-2014, 2014.

#### Code/Packages

<a href="https://models.slf.ch/p/meteoio/" class="author-social" target="_blank"><i class="fa fa-fw fa-github"></i> SLF </a>

---

### SNOWPACK
SNOWPACK is a multi-purpose snow and land-surface model, which focusses on a detailed description of the mass and energy exchange between the snow, the atmosphere and optionally with the vegetation cover and the soil. It also includes a detailed treatment of mass and energy fluxes within these media.

#### References

#### Code/Packages
<a href="https://models.slf.ch/p/snowpack/" class="author-social" target="_blank"><i class="fa fa-fw fa-github"></i> SLF </a>

### The basics

- Linux
- Bash scripting for making stuff run
- Awk lightning fast data manipulation
- R data analysis and geospatial functions
- Various geospatial tools and libraries
- Python for building stuff and pandas data tools
- Sublime, less, joe editors
- Sql (mysql/postgres) databases
- Git/Github version control and repository
- Jekyll / Markdown for docs and sites
