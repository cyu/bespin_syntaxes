"define metadata";
({
    "description": "Cake syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "thtml",
            "pointer": "#CakeSyntax",
            "fileexts": [
  "thtml"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = null;

var patterns = [
  {
    "name": "support.function.model.cake",
    "match": "\\b(bindModel|unbindModel|hasField|read|field|save|saveField|remove|del|delete|exists|hasAny|find|findAll|findCount|execute|query|validates|invalidate|invalidFields|isForeignKey|getDisplayField|generateList|getID|getLastInsertID|getInsertID|getNumRows|getAffectedRows|setDatasource|beforeFind|afterFind|beforeSave|afterSave|beforeDelete|afterDelete)\\b"
  },
  {
    "name": "support.function.controller.cake",
    "match": "\\b(redirect|set|setAction|validate|validateErrors|render|referer|flash|flashOut|generateFieldNames|postCondtions|cleanUpFields|beforeFilter|beforeRender|afterFilter)\\b"
  },
  {
    "name": "support.constant.core.cake",
    "match": "\\b(ACL_CLASSNAME|ACL_FILENAME|APP|APP_DIR|APP_PATH|AUTO_OUTPUT|AUTO_SESSION|CACHE|CACHE_CHECK|CAKE|CAKE_CORE_INCLUDE_PATH|CAKE_SECURITY|CAKE_SESSION_COOKIE|CAKE_SESSION_SAVE|CAKE_SESSION_STRING|CAKE_SESSION_TIMEOUT|COMPONENTS|COMPRESS_CSS|CONFIGS|CONTROLLER_TESTS|CONTROLLERS|CORE_PATH|CSS|DAY|DEBUG|DS|ELEMENTS|HELPER_TESTS|HELPERS|HOUR|INFLECTIONS|JS|LAYOUTS|LIB_TESTS|LIBS|LOG_ERROR|LOGS|MAX_MD5SIZE|MINUTE|MODEL_TESTS|MODELS|MODULES|MONTH|PEAR|ROOT|SCRIPTS|SECOND|TAG_DIV|TAG_FIELDSET|TAG_LABEL|TAG_P_CLASS|TESTS|TMP|VALID_EMAIL|VALID_NOT_EMPTY|VALID_NUMBER|VALID_YEAR|VENDORS|VIEWS|WEBROOT_DIR|WEBSERVICES|WEEK|WWW_ROOT|YEAR)\\b"
  },
  {
    "name": "invalid.deprecated.model.cake",
    "match": "\\b(setId|findBySql)\\b"
  },
  {
    "name": "invalid.deprecated.helper.html.cake",
    "match": "\\b(areaTag|charsetTag|checkboxTag|contentTag|cssTag|fileTag|formTag|guiListTag|hiddenTag|imageTag|inputTag|javascriptIncludeTag|javascriptTag|linkEmail|linkOut|linkTo|parseHtmlOptions|passwordTag|radioTags|submitTag|tag|urlFor)\\b"
  },
  {
    "name": "invalid.deprecated.helper.ajax.cake",
    "match": "\\b(linkToRemote)\\b"
  },
  {
    "name": "support.function.helper.cake",
    "match": "\\b(isFieldError|labelTag|divTag|pTag|generate(Input|Checkbox|Area|Select|submit)Div|generate(Date|DateTime|Fields))\\b"
  },
  {
    "name": "support.function.helper.html.cake",
    "match": "\\b(addCrumb|charset|url|link|submit|password|textarea|checkbox|css|file|getCrumbs|hidden|image|input|radio|tableHeaders|tableCells|validate|tagIsValid|validateErrors|tagErrorMsg|selectTag|(day|year|month|hour|minute|meridian|date)OptionTag)\\b"
  },
  {
    "name": "support.function.helper.ajax.cake",
    "match": "\\b(link|remoteFunction|remoteTimer|form|submit|observe(Field|Form)|autoComplete|drag|drop|dropRemote|slider|editor|sortable)\\b"
  },
  {
    "name": "support.function.file.cake",
    "match": "\\b(read|append|write|get(Md5|Size|Ext|Name|Owner|Group|Folder|Chmod|FullPath)|create|exists|delete|writable|executable|readable|last(Access|Change))\\b"
  },
  {
    "name": "support.function.log.cake",
    "match": "\\b(write)\\b"
  },
  {
    "name": "support.function.helper.number.cake",
    "match": "\\b(precision|toReadableSize|toPercentage)\\b"
  },
  {
    "name": "support.function.component.requestHandler.cake",
    "match": "\\b(startup|setAjax|is(Ajax|Xml|Rss|Atom|Post|Get|Delete|Mobile)|getAjaxVersion|setContent|get(Referer|ClientIP)|strip(WhiteSpace|Images|Scripts|All|tags)|accepts|prefers)\\b"
  },
  {
    "name": "support.function.component.session.cake",
    "match": "\\b(write|read|del|delete|check|error|setFlash|flash|renew|valid)\\b"
  },
  {
    "name": "support.function.component.security.cake",
    "match": "\\b(startup|blackHole|requirePost|requireAuth)\\b"
  },
  {
    "name": "support.function.component.sanitize.cake",
    "match": "\\b(paranoid|sql|html|cleanArray|cleanArrayR|cleanValue|formatColumns)\\b"
  },
  {
    "name": "support.function.helper.time.cake",
    "match": "\\b(trim|fromString|nice|niceShort|isToday|daysAsSql|dayAsSql|isThisYear|wasYesterday|isTomorrow|toUnix|toAtom|toRSS|timeAgoInWords|relativeTime|wasWithinLast)\\b"
  },
  {
    "name": "support.function.helper.text.cake",
    "match": "\\b(highlight|stripLinks|autoLinkUrls|autoLinkEmails|autoLink|truncate|excerpt|flay)\\b"
  },
  {
    "name": "support.function.helper.javascript.cake",
    "match": "\\b(codeBlock|link|linkOut|escape(String|Script)|event|(cache|write)Events|includeScript|object)\\b"
  },
  {
    "name": "support.function.neatArray.cake",
    "match": "\\b(findIn|cleanup|add|plus|totals|filter|walk|sprintf|extract|unique|makeUnique|joinWith|threaded|multi_search)\\b"
  },
  {
    "name": "support.function.neatString.cake",
    "match": "\\b(toArray|toRoman|toCompressed|randomPassword)\\b"
  },
  {
    "name": "support.function.basics.cake",
    "match": "\\b(load(Models|PluginModels|View|Model|Controllers|PluginController)|listClasses|config|gendor|debug|aa|ha|a|e|low|up|r|pr|params|am|setUri|env|cache|clearCache|stripslashes_deep|countDim|LogError|fileExistsInPAth|convertSlash)\\b"
  },
  {
    "include": "source.php"
  },
  {
    "include": "text.html.basic"
  }
];

exports.CakeSyntax = new TextmateSyntax(repositories, patterns);
