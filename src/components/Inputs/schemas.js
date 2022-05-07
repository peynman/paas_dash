import ImageUploadInput from './ImageUploadInput/schema'
import CaptchaInput from './CaptchaInput/schema'
import AddressInput from './AddressInput/schema'
import AutocompleteInput from './AutocompleteInput/schema'
import DomainPicker from './DomainPicker/schema'
import PhoneNumberInput from './PhoneNumberInput/schema'
import ProductCellarInput from './ProductCellarInput/schema'
import ProductImagesInput from './ProductImagesInput/schema'
import ProductDetailsInput from './ProductDetailsInput/schema'
import ValidationsAlert from './ValidationsAlert/schema'
import CKEditorInput from './CKEditorInput/schema'
import FileUploadInput from './FileUploadInput/schema'
import CrudSingleStat from './Charts/SingleStat/schema'
import PageSourcesInput from './PageSourcesInput/schema'
import CodeEditor from './CodeEditor/schema'
import ParagraphView from './ParagraphView/schema'

const Components = [
  ImageUploadInput,
  CaptchaInput,
  ValidationsAlert,
  ProductCellarInput,
  ProductImagesInput,
  ProductDetailsInput,
  PhoneNumberInput,
  DomainPicker,
  AutocompleteInput,
  AddressInput,
  CKEditorInput,
  FileUploadInput,
  CrudSingleStat,
  CodeEditor,
  PageSourcesInput,
  ParagraphView,
]

export default Components

export const ComponentsDictionary = Components.reduce((dic, c) => {
  dic[c.name] = c.factory
  return dic
}, {})
