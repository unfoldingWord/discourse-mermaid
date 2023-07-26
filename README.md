# Archived
This plugin is no longer active because there is a Discourse [theme component](https://meta.discourse.org/t/discourse-mermaid/218242) that provides mermaid functionality more effectively.

# discourse-mermaid

Adds the [Mermaid JS](https://mermaidjs.github.io/) library to discourse so that posts can make use of its features.

## Installation

Install the plugin via the Docker `app.yml` configuration file.  Like this:

    hooks:
      after_code:
        - exec:
            cd: $home/plugins
            cmd:
              - mkdir -p plugins
              - git clone https://github.com/discourse/docker_manager.git
              - git clone https://github.com/unfoldingWord-dev/discourse-mermaid.git

Then rebuild your Discourse instance with:

    cd /var/discourse
    ./launcher rebuild app

## Usage

See the [Mermaid JS](https://mermaidjs.github.io/) site for documentation and examples.  To use with a discourse post, wrap the chart defintion in `mermaid` tags, like this:

    [mermaid]
    gantt
        title A Gantt Diagram
        dateFormat  YYYY-MM-DD
        section Section
        A task           :a1, 2019-01-01, 30d
        Another task     :after a1  , 20d
        section Another
        Task in sec      :2019-01-12  , 12d
        another task      : 24d
    [/mermaid]

## Credits

Both https://github.com/sekhat/discourse-yuml and https://github.com/pnewell/discourse-mermaid were useful in putting this plugin together.  Of course, so was the documentation at https://meta.discourse.org/t/developers-guide-to-markdown-extensions/66023 .
