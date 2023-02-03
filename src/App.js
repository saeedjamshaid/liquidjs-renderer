import "./styles.css";
import { LiquidJS } from "./TemplateEngine";

const partialTpls = {
  employee:
    'new Employee.Builder(\n{% if showFullCode %}        {% endif %}{{indent}}    {% if field["address"] != nil %}"{{ field["address"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}    {% if field["age"] != nil %}{{ field["age"] }}L{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}    LocalDate.parse({% if field["birthday"] != nil %}"{{ field["birthday"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %}),\n{% if showFullCode %}        {% endif %}{{indent}}    LocalDateTime.parse({% if field["birthtime"] != nil %}"{{ field["birthtime"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}        DateTimeFormatter.ISO_DATE_TIME),\n{% if showFullCode %}        {% endif %}{{indent}}    {% if field["name"] != nil %}"{{ field["name"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}    {% if field["uid"] != nil %}"{{ field["uid"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}    {% if field["department"] != nil %}"{{ field["department"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}    {% capture newIndent %}{{indent}}    {% endcapture %}{% render \'person_array\', field: field["dependents"], indent: newIndent, showFullCode: showFullCode %},\n{% if showFullCode %}        {% endif %}{{indent}}    DateTimeHelper.fromRfc1123DateTime({% if field["hiredAt"] != nil %}"{{ field["hiredAt"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %}),\n{% if showFullCode %}        {% endif %}{{indent}}    {% case field["joiningDay"] %}{% when "Sunday" %}Days.SUNDAY{% when "Monday" %}Days.MONDAY{% when "Tuesday" %}Days.TUESDAY{% when "Wednesday" %}Days.WEDNESDAY_{% when "Thursday" %}Days.THURSDAY{% when "Friday" %}Days.FRI_DAY{% when "Saturday" %}Days.SATURDAY{% when nil %}null{% else %}envrr{% endcase %},\n{% if showFullCode %}        {% endif %}{{indent}}    {% if field["salary"] != nil %}{{ field["salary"] }}{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}    {% capture newIndent %}{{indent}}    {% endcapture %}{% render \'days_array\', field: field["workingDays"], indent: newIndent, showFullCode: showFullCode %},\n{% if showFullCode %}        {% endif %}{{indent}}    {% capture newIndent %}{{indent}}    {% endcapture %}{% render \'person\', field: field["boss"], indent: newIndent, showFullCode: showFullCode %}\n{% if showFullCode %}        {% endif %}{{indent}})\n{% if showFullCode %}        {% endif %}{% if field["personType"] != nil %}{{indent}}.personType({% if field["personType"] != nil %}{% if field["personType"] != nil %}"{{ field["personType"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %}{% endif %})\n{% if showFullCode %}        {% endif %}{% endif %}{{indent}}.build()',
  person_array:
    "new LinkedList<Person>(Arrays.asList(\n{% if showFullCode %}        {% endif %}{% for this in field %}{{indent}}    {% capture newIndent %}{{indent}}    {% endcapture %}{% render 'person', field: this, indent: newIndent, showFullCode: showFullCode %}{% unless forloop.last %},\n{% if showFullCode %}        {% endif %}{% endunless %}{% endfor %}\n{% if showFullCode %}        {% endif %}{{indent}}))",
  person:
    'new Person.Builder(\n{% if showFullCode %}        {% endif %}{{indent}}    {% if field["address"] != nil %}"{{ field["address"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}    {% if field["age"] != nil %}{{ field["age"] }}L{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}    LocalDate.parse({% if field["birthday"] != nil %}"{{ field["birthday"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %}),\n{% if showFullCode %}        {% endif %}{{indent}}    LocalDateTime.parse({% if field["birthtime"] != nil %}"{{ field["birthtime"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}        DateTimeFormatter.ISO_DATE_TIME),\n{% if showFullCode %}        {% endif %}{{indent}}    {% if field["name"] != nil %}"{{ field["name"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %},\n{% if showFullCode %}        {% endif %}{{indent}}    {% if field["uid"] != nil %}"{{ field["uid"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %}\n{% if showFullCode %}        {% endif %}{{indent}})\n{% if showFullCode %}        {% endif %}{% if field["personType"] != nil %}{{indent}}.personType({% if field["personType"] != nil %}{% if field["personType"] != nil %}"{{ field["personType"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %}{% endif %})\n{% if showFullCode %}        {% endif %}{% endif %}{{indent}}.build()',
  days_array:
    'new LinkedList<Days>(Arrays.asList(\n{% if showFullCode %}        {% endif %}{% for this in field %}{{indent}}    {% case this %}{% when "Sunday" %}Days.SUNDAY{% when "Monday" %}Days.MONDAY{% when "Tuesday" %}Days.TUESDAY{% when "Wednesday" %}Days.WEDNESDAY_{% when "Thursday" %}Days.THURSDAY{% when "Friday" %}Days.FRI_DAY{% when "Saturday" %}Days.SATURDAY{% when nil %}null{% else %}envrr{% endcase %}{% unless forloop.last %},\n{% if showFullCode %}        {% endif %}{% endunless %}{% endfor %}\n{% if showFullCode %}        {% endif %}{{indent}}))'
};

const liquid = new LiquidJS(partialTpls);

let ctx = {
  showFullCode: false,
  call: {
    additionalQueryParams: null,
    additionalFieldParams: null,
    args: {
      model: {
        department: "department8",
        dependents: [
          {
            address: "address5",
            age: 237,
            birthday: "2016-03-13",
            birthtime: "2016-03-13T12:52:32.123Z",
            name: "name9",
            uid: "uid9",
            personType: "Per"
          }
        ],
        hiredAt: "Mon, 15 Jun 2009 20:45:30 GMT",
        joiningDay: "Monday",
        salary: 240,
        workingDays: ["Thursday", "Wednesday", "Tuesday"],
        boss: {
          address: "address6",
          age: 158,
          birthday: "2016-03-13",
          birthtime: "2016-03-13T12:52:32.123Z",
          name: "name0",
          uid: "uid0",
          personType: "Per"
        },
        address: "address8",
        age: 186,
        birthday: "2016-03-13",
        birthtime: "2016-03-13T12:52:32.123Z",
        name: "name2",
        uid: "uid2",
        personType: "Empl"
      }
    }
  }
};

let tpl =
  '{% if showFullCode %}package com.example;\n\nimport java.util.*;\nimport java.io.*;\n\nimport localhost3000.*;\nimport localhost3000.models.*;\nimport localhost3000.controllers.*;\nimport localhost3000.exceptions.ApiException;\n\nimport java.time.LocalDate;\nimport java.time.LocalDateTime;\nimport java.time.ZoneId;\nimport java.time.Instant;\nimport java.time.format.DateTimeFormatter;\n\npublic class Program {\n\n    public static void main(String[] args) {\n{% if showFullCode %}        {% endif %}TesterClient client = new TesterClient.Builder()\n{% if showFullCode %}        {% endif %}    .httpClientConfig(configBuilder -> configBuilder\n{% if showFullCode %}        {% endif %}            .timeout(0)){% if environment != "testing" or showFullCode == false %}\n{% if showFullCode %}        {% endif %}    .environment({% case environment %}{% when "production" %}Environment.PRODUCTION{% when "testing" %}Environment.TESTING{% else %}envrr{% endcase %}){% endif %}{% if config["port"]  != "80" or showFullCode == false %}\n{% if showFullCode %}        {% endif %}    .port({% if config["port"] != nil %}"{{ config["port"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %}){% endif %}{% if config["suites"]  != "1" or showFullCode == false %}\n{% if showFullCode %}        {% endif %}    .suites({% case config["suites"] %}{% when 1 %}SuiteCode.HEARTS{% when 2 %}SuiteCode.SPADES{% when 3 %}SuiteCode.CLUBS{% when 4 %}SuiteCode.DIAMONDS{% when nil %}null{% else %}envrr{% endcase %}){% endif %}\n{% if showFullCode %}        {% endif %}    .build();\n{% if showFullCode %}        {% endif %}\n{% if showFullCode %}        {% endif %}BodyParamsController bodyParamsController = client.getBodyParamsController();\n{% if showFullCode %}        {% endif %}\n{% endif %}{% if showFullCode %}        {% endif %}Employee model = {% render \'employee\', field: call["args"]["model"], indent: \'\', showFullCode: showFullCode %};\n{% if showFullCode %}        {% endif %}\n{% if showFullCode %}        {% endif %}bodyParamsController.sendModelAsync({% if model %}null{% else %}model{% endif %}).thenAccept(result -> {\n{% if showFullCode %}        {% endif %}    // TODO success callback handler\n{% if showFullCode %}        {% endif %}}).exceptionally(exception -> {\n{% if showFullCode %}        {% endif %}    // TODO failure callback handler\n{% if showFullCode %}        {% endif %}    return null;\n{% if showFullCode %}        {% endif %}});{% if showFullCode %}\n    }\n}{% endif %}\n';

const parsed = liquid.parse(tpl);
liquid.render(parsed, ctx).then((o) => {
  console.log(o);
});

export default function App() {
  return (
    <div className="App">
      <h1>Liquid Renderer</h1>
      <h2>Check the console for output</h2>
    </div>
  );
}
