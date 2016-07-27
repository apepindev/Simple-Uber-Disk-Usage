style =
	width: "20%"

	position:
		top:    "2.5em"
		bottom: "0"
		left:   "3%"
		right:  "0"

	font:            "SFNS Display, 'Helvetica Neue', sans-serif"
	font_color:      "white"
	font_size:       "32px"
	font_weight:     "bold"
	letter_spacing:  "0.025em"
	line_height:     ".9em"

	shadow:
		blur: 		"0px"
		x_offset: "1px"
		y_offset: "1px"
		color:    "rgba(0, 0, 0, .4)"

	text_align:     "left"
	text_transform: "uppercase"

	icon:
		png: "/hddspace.widget/PNG/hdd-32.png"

command: "df -H | grep '/dev/disk0s2' | awk '{ print $8 }'"

refreshFrequency: (1000 * 3)

render: (output) -> """
  <table id="content">
		<tr>
			<td class="icon bg"></td>
			<td class="system-val"></td>
		</tr>
	</table>
"""

update: (output, domEl) ->
  $(domEl).find('.system-val').html(output)

style: """
	top: #{style.position.top}
	bottom: #{style.position.bottom}
	right: #{style.position.right}
	left: #{style.position.left}
	width: #{style.width}
	font-family: #{style.font}
	color: #{style.font_color}
	font-weight: #{style.font_weight}
	text-align: #{style.text_align}
	text-transform: #{style.text_transform}
	font-size: #{style.font_size}
	letter-spacing: #{style.letter_spacing}
	font-smoothing: antialiased
	text-shadow: #{style.shadow.x_offset} #{style.shadow.y_offset} #{style.shadow.blur} #{style.shadow.color}
	line-height: #{style.line_height}

	.icon
		background: url('#{style.icon.png}')
		-webkit-filter: drop-shadow(#{style.shadow.x_offset} #{style.shadow.y_offset} #{style.shadow.blur} #{style.shadow.color})
		filter: drop-shadow(#{style.shadow.x_offset} #{style.shadow.y_offset} #{style.shadow.blur} #{style.shadow.color})

	.bg
    height: 40px
    width: 50px
    float: left
    background-position: center 5px
    background-repeat: no-repeat
    background-size: 32px 32px

"""
