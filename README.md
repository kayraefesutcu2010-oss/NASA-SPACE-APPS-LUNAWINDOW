# LunaWindow

Lunar landing-site sunlight, Earth visibility and estimated solar power. Includes a 3D Moon, site comparison, lunar-day charts, CSV/JSON export, and links to NASA Moon Trek and LROC QuickMap.

## Run

```bash
npm install
npm run dev
```

The development server runs on port 4731. `npm run build` creates a static site. The live JPL Horizons check needs the Horizons proxy; it runs with the development and preview servers.

## Use

Choose a site and UTC time. Use the globe to select custom coordinates. The page shows Sun and Earth visibility, a one-lunar-day chart, estimated panel output, and site comparisons. CSV and JSON exports are available in the lunar-day panel.

Visibility uses hourly samples. Without a loaded terrain profile, the horizon is a smooth sphere. With one, local topography changes Sun/Earth visibility and the solar-power estimate. The 3D globe itself still uses a smooth surface.

## LOLA terrain profile

NASA Moon Trek's LOLA hillshade is imagery, not numeric elevation. To calculate a local terrain horizon, download a south-polar LOLA elevation GeoTIFF from [NASA PGDA product 78](https://pgda.gsfc.nasa.gov/products/78) or [product 90](https://pgda.gsfc.nasa.gov/products/90). Product 78 includes 5 m/pixel site DEMs; product 90 provides broader south-polar coverage at several pixel scales.

Install Python and Rasterio, then create a 360-direction profile for the selected coordinates and mast height:

```bash
python -m pip install rasterio
python scripts/make-lola-horizon.py path/to/LOLA_DEM.tif --lat -89.684 --lon 196.739 --mast 2 --output lola-horizon.csv
```

Load `lola-horizon.csv` in the page. The profile only applies to the exact site and mast height used to create it. The default ray length is 20 km (`--radius` changes it); use a DEM that covers the site and the full ray distance. The helper expects NASA south-polar stereographic coordinates in metres.

## Temperature and dust assumptions

Solar output includes editable panel cell temperature, temperature coefficient, and dust transmission. These are scenario inputs, not live measurements of lunar surface temperature or dust loading. Dust transmission represents reduced light reaching the panel. No thermal inertia or time-varying surface-temperature model is included.

NASA's [DUST software entry](https://software.nasa.gov/software/MSC-27522-1) describes a separate Unreal visualization using LRO DEMs, SPICE ephemerides, and representative surface textures and crater/rock distributions. The page provides request instructions, not a dataset or library this web app can directly load.

## Shared links

The page address stores the selected site, UTC time, mast height, panel settings, and comparison list. Custom coordinates use `site=custom&lat=<degrees>&lon=<degrees east>`.

## Main code

- `src/components/` — page panels and 3D globe.
- `src/data/` — landing sites, sources, and map layers.
- `src/lib/ephem/` — Sun and Earth positions, visibility windows, and exports.
- `src/lib/power/` — solar panel estimate.
- `server/horizons-proxy.mjs` — JPL Horizons proxy.
