import React from 'react'

import IconLineLogo from '../assets/images/logo.svg'

import IconDashboard from '../assets/icons/icon-dashboard.svg'
import IconForecast from '../assets/icons/icon-demandforcast.svg'
import IconHelp from '../assets/icons/icon-help.svg'
import IconDrawer from '../assets/icons/icon-drawer.svg'
import IconArrowDown from '../assets/icons/icon-arrow-down.svg'
import IconArrowDownWhite from '../assets/icons/icon-arrow-down-white.svg'
import IconArrowRight from '../assets/icons/icon-arrow-right.svg'

import IconPackage from '../assets/icons/icon-package.svg'
import IconPackageBlack from '../assets/icons/icon-package-black.svg'
import IconStar from '../assets/icons/icon-star.svg'
import IconStarBlack from '../assets/icons/icon-star-black.svg'
import IconCloseBlack from '../assets/icons/icon-close-black.svg'
import IconFlask from '../assets/icons/icon-flask-black.svg'

import IconBoxBlack from '../assets/icons/icon-box-black.svg'
import IconBox2Black from '../assets/icons/icon-box2-black.svg'
import IconBox2White from '../assets/icons/icon-box2-white.svg'

import IconSaveBlack from '../assets/icons/icon-save-black.svg'
import IconSortBlack from '../assets/icons/icon-sort-black.svg'
import IconStackBlue from '../assets/icons/icon-stack-blue.svg'

import IconFilterWhite from '../assets/icons/icon-filter-white.svg'
import IconFilterBlack from '../assets/icons/icon-filter-black.svg'

import IconCheckboxChecked from '../assets/icons/icon-checkbox-checked.svg'
import IconCheckboxUnchecked from '../assets/icons/icon-checkbox-unchecked.svg'
import IconCheckGreen from '../assets/icons/icon-check-green.svg'
import IconCheckGreenLight from '../assets/icons/icon-check-green-light.svg'

import IconRestricted from '../assets/icons/icon-restricted.svg'
import IconPrice from '../assets/icons/icon-price.svg'
import IconDG from '../assets/icons/icon-dg.svg'
import IconHZ from '../assets/icons/icon-hz.svg'
import IconKey from '../assets/icons/icon-key.svg'

import IconMoney from '../assets/icons/icon-money.svg'
import IconStockswap from '../assets/icons/icon-stockswap.svg'

import IconSlowmovers from '../assets/icons/icon-slowmovers.svg'
import IconInterco from '../assets/icons/icon-interco.svg'

import IconCloudSearch from '../assets/icons/icon-cloud-search.svg'
import IconSearch from '../assets/icons/icon-search-grey.svg'

import IconBuildingBlack from '../assets/icons/icon-building-black.svg'
import IconBuildingWhite from '../assets/icons/icon-building-white.svg'

import IconSupplierWhite from '../assets/icons/icon-supplier-white.svg'
import IconSupplierBlack from '../assets/icons/icon-supplier-black.svg'

import IconCogBlack from '../assets/icons/icon-cog-black.svg'
import IconCogWhite from '../assets/icons/icon-cog-white.svg'

import IconPowerWhite from '../assets/icons/icon-power-white.svg'
import IconPowerBlack from '../assets/icons/icon-power-black.svg'
import IconLoginArrow from '../assets/icons/icon-login-arrow-white.svg'

import IconCloseNoOutline from '../assets/icons/icon-close-no-outline.svg'
import IconPaperplane from '../assets/icons/icon-paperplane.svg'
import IconQuestion from '../assets/icons/icon-question.svg'

export const LineLogoIcon = ({ className }) => (
  <img src={IconLineLogo} className={className} alt='' />
)

export const DashboardIcon = ({ className }) => (
  <img src={IconDashboard} className={className} alt='' />
)

export const ForecastIcon = ({ className }) => (
  <img src={IconForecast} className={className} alt='' />
)

export const HelpIcon = ({ className }) => (
  <img src={IconHelp} className={className} alt='' />
)

export const DrawerIcon = ({ className }) => (
  <img src={IconDrawer} className={className} alt='' />
)

export const ArrowDownIcon = ({ className, black }) => (
  <img src={black ? IconArrowDown : IconArrowDownWhite} className={className} alt='' />
)

export const ArrowRightIcon = ({ className }) => (
  <img src={IconArrowRight} className={className} alt='' />
)

export const PackageIcon = ({ className, black }) => (
  <img src={black ? IconPackageBlack : IconPackage} className={className} alt='' />
)

export const StarIcon = ({ className, black }) => (
  <img src={black ? IconStarBlack : IconStar} className={className} alt='' />
)

export const CloseIcon = ({ className, black, onClick }) => (
  <img src={black ? IconCloseBlack : IconCloseBlack} className={className} alt='' onClick={onClick} />
)

export const FlaskIcon = ({ className, black }) => (
  <img src={black ? IconFlask : IconFlask} className={className} alt='' />
)

export const BoxIcon = ({ className, black }) => (
  <img src={black ? IconBoxBlack : IconBoxBlack} className={className} alt='' />
)

export const Box2Icon = ({ className, black }) => (
  <img src={black ? IconBox2Black : IconBox2White} className={className} alt='' />
)

export const SaveIcon = ({ className, black }) => (
  <img src={black ? IconSaveBlack : IconSaveBlack} className={className} alt='' />
)

export const SortIcon = ({ className, black }) => (
  <img src={black ? IconSortBlack : IconSortBlack} className={className} alt='' />
)

export const StackIcon = ({ className }) => (
  <img src={IconStackBlue} className={className} alt='' />
)

export const FilterIcon = ({ className, black }) => (
  <img src={black ? IconFilterBlack : IconFilterWhite} className={className} alt='' />
)

export const CheckboxIcon = ({ className, checked }) => (
  <img src={checked ? IconCheckboxChecked : IconCheckboxUnchecked} className={className} alt='' />
)

export const CheckGreenIcon = ({ className, light }) => (
  <img src={light ? IconCheckGreenLight : IconCheckGreen} className={className} alt='' />
)

export const RestrictedIcon = ({ className }) => (
  <img src={IconRestricted} className={className} alt='' />
)

export const PriceIcon = ({ className }) => (
  <img src={IconPrice} className={className} alt='' />
)

export const DGIcon = ({ className }) => (
  <img src={IconDG} className={className} alt='' />
)

export const HZIcon = ({ className }) => (
  <img src={IconHZ} className={className} alt='' />
)

export const KeyIcon = ({ className }) => (
  <img src={IconKey} className={className} alt='' />
)

export const MoneyIcon = ({ className }) => (
  <img src={IconMoney} className={className} alt='' />
)

export const StockswapIcon = ({ className }) => (
  <img src={IconStockswap} className={className} alt='' />
)

export const SlowmoversIcon = ({ className }) => (
  <img src={IconSlowmovers} className={className} alt='' />
)

export const IntercoIcon = ({ className }) => (
  <img src={IconInterco} className={className} alt='' />
)

export const SearchIcon = ({ className }) => (
  <img src={IconSearch} className={className} alt='' />
)

export const CloudSearchIcon = ({ className }) => (
  <img src={IconCloudSearch} className={className} alt='' />
)

export const BuildingIcon = ({ className, black }) => (
  <img src={black ? IconBuildingBlack : IconBuildingWhite} className={className} alt='' />
)

export const SupplierIcon = ({ className, black }) => (
  <img src={black ? IconSupplierBlack : IconSupplierWhite} className={className} alt='' />
)

export const CogIcon = ({ className, black }) => (
  <img src={black ? IconCogBlack : IconCogWhite} className={className} alt='' />
)

export const PowerIcon = ({ className, black }) => (
  <img src={black ? IconPowerBlack : IconPowerWhite} className={className} alt='' />
)

export const LoginArrowIcon = ({ className }) => (
  <img src={IconLoginArrow} className={className} alt='' />
)

/* End */
export const CloseNoOutlineIcon = ({ className, onClick }) => (
  <img src={IconCloseNoOutline} className={className} onClick={onClick} alt='' />
)

export const PaperplaneIcon = ({ className, onClick }) => (
  <img src={IconPaperplane} className={className} onClick={onClick} alt='' />
)

export const QuestionIcon = ({ className, onClick }) => (
  <img src={IconQuestion} className={className} onClick={onClick} alt='' />
)
