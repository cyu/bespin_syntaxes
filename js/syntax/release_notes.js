"define metadata";
({
    "description": "Release Notes syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "tmReleaseNotes",
            "pointer": "#Release NotesSyntax",
            "fileexts": [
  "tmReleaseNotes"
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
    "name": "meta.separator.release-notes",
    "captures": {
      "1": {
        "name": "punctuation.definition.separator.release-notes"
      },
      "2": {
        "name": "meta.toc-list.release-notes"
      },
      "3": {
        "name": "punctuation.definition.separator.release-notes"
      }
    },
    "match": "^(\\[)(?:[\\d-]+: )?(REVISION (\\d+|v[\\d.b]+))(\\])$\\n"
  },
  {
    "begin": "^([ \\t]*)(?=\\S)",
    "end": "^(?!\\1(?=\\S))",
    "contentName": "meta.paragraph.text",
    "patterns": [
      {
        "name": "markup.underline.link",
        "match": "(https?|ftp|mailto):\\S+?(?=[)>,.':;\"]*(\\s|$)|$)"
      },
      {
        "captures": {
          "1": {
            "name": "keyword.other.release-notes"
          },
          "2": {
            "name": "punctuation.definition.keyword.release-notes"
          },
          "3": {
            "name": "punctuation.definition.keyword.release-notes"
          },
          "4": {
            "name": "constant.other.bundle-name.release-notes"
          }
        },
        "match": "((\\[)(?:NEW|FIXED|CHANGED|REMOVED|INFO)(\\])) (?:(.+? bundle):)?"
      },
      {
        "name": "meta.ticket.release-notes",
        "captures": {
          "1": {
            "name": "storage.type.ticket.release-notes"
          },
          "2": {
            "name": "constant.numeric.ticket.release-notes"
          }
        },
        "match": "([Tt]icket) ([0-9A-F]{8})\\b"
      },
      {
        "name": "meta.word.camel-case",
        "comment": "I do not want spell checking for CamelCase words. Since this is generally when quoting various API’s, I have deliberately used A-Z and a-z (ASCII) -- Allan",
        "match": "\\b[A-Z]*[a-z]+[A-Z]\\w*\\b"
      },
      {
        "captures": {
          "1": {
            "name": "constant.other.committer-name.release-notes"
          }
        },
        "match": "\\((G(erd Knops|a(vin Kistner|rrett J. Woodworth)|ra(nt Hollingworth|eme Rocher))|R(yan McCuaig|ich Barton|o(ss Harmes|ger Braunstein|b(ert Rainthorpe| (Rix|Bevan))))|M(i(cha(il Pishchagin|el Sheets)|tch Chapman|etek Bąk|k(e Mellor|ael Säker))|a(t(s Persson|t(hew Gilbert|eo Spinelli| Pelletier))|r(tin Ström|k Grimes)|x Williams))|B(ill Duenskie|ob Fleck|en(oit Gagnon|jamin Jackson| Perry)|arrett Clark|r(ian (Donovan|Lalor)|ett Terpstra|ad (Miller|Choate)))|H(enrik Nyh|adley Wickham)|S(t(ephen Skubik-Peplaski|éphane Payrard|anley Rost)|imon (Gregory|Strandgaard)|u(ne Foldager|dara Williams)|ebastian Gräßl|am DeVore)|Nathan Youngman|C(h(a(ndler McWilliams|rilaos Skiadas)|ris(topher Forsythe| (Thomas|Jenkins)))|iarán Walsh)|T(homas Aylott|o(rsten Becker|m Lazar|bias Luetke)|akaaki Kato|roy Mcilvena)|Ian (Joyner|White)|Ollivier Robert|D(om(inique Peretti|enico Carbotta)|uane Johnson|a(n(iel Harple| Kelley)|vid (Glasser|Bonnet|Hansson|Powers|Wikler))|rew Colthorp)|J(iun Wei Chia|o(shua Emmons|nathan (Ragan-Kelley|Chaffer)|e Maller|achim Mårtensson)|ustin French|eroen van der Ham|a(cob Rus|y Soffian|kub Nešetřil|m(is Buck|es (Edward Gray II|A. Baker))))|Paul(o Jorge Lopes de Moura| Bissex)|Eric Hsu|K(umar McMillan|evin Ballard)|F(ergus Bremner|abien POTENCIER|lorent Pillet|r(édéric Ballériaux|ank Brault))|Wil(son Miner|liam (D. Neumann|Prater))|A(n(thony Underwood|d(y Herbert|ers Thid|rew Henson))|dam Sanderson|urelio Marinho Jargas|parajita Fishman|l(e( Muñoz|xand(er John Ross|re Girard))|an Schussman|lan Odgaard)|mro Nasr))\\)$"
      }
    ]
  }
];

exports.Release NotesSyntax = new TextmateSyntax(repositories, patterns);
