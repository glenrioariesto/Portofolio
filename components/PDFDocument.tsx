import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { cvData } from '@/data';

// Register a clean font (optional, using default Helvetica/Times-Roman is most stable)
// But for a pro look, we can define styles.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 12,
    color: '#78350f', // amber-900
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    fontSize: 9,
    color: '#4b5563',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 4,
    marginBottom: 8,
  },
  summary: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  role: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  companyDate: {
    fontSize: 9,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  companySub: {
    fontSize: 9,
    color: '#78350f',
    fontWeight: 'bold',
    backgroundColor: '#fffdfa',
    padding: '2 4',
    marginBottom: 4,
  },
  achievement: {
    fontSize: 10,
    color: '#4b5563',
    marginLeft: 12,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  skillsGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  skillColumn: {
    flex: 1,
  },
  skillLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9ca3af',
    marginBottom: 4,
  },
  skillText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
  },
  eduGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  eduTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  gpa: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#78350f',
    padding: '2 4',
    borderRadius: 2,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  projectDesc: {
    fontSize: 9,
    color: '#6b7280',
  }
});

const PDFDocument = () => {
  const { personalInfo, summary, skills, workExperience, education, projects, achievements } = cvData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <View style={styles.contactRow}>
            <Text>{personalInfo.phone} | {personalInfo.email} | {personalInfo.location}</Text>
          </View>
          <View style={[styles.contactRow, { marginTop: 4 }]}>
            <Text>{personalInfo.linkedin} | {personalInfo.github} | {personalInfo.portfolio}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{summary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {workExperience.map((work, index) => (
            <View key={index} style={styles.experienceItem} wrap={false}>
              <View style={styles.experienceHeader}>
                <Text style={styles.role}>{work.role}</Text>
                <Text style={styles.companyDate}>{work.dates.toUpperCase()}</Text>
              </View>
              <Text style={styles.companySub}>{work.company.toUpperCase()} | {work.location}</Text>
              {work.achievements.map((ach, idx) => (
                <Text key={idx} style={styles.achievement}>• {ach}</Text>
              ))}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Expertise</Text>
          <View style={styles.skillsGrid}>
            <View style={styles.skillColumn}>
              <Text style={styles.skillLabel}>HARD SKILLS</Text>
              <Text style={styles.skillText}>{skills.hardSkills.join(" • ")}</Text>
            </View>
            <View style={styles.skillColumn}>
              <Text style={styles.skillLabel}>TOOLS & ENVIRONMENT</Text>
              <Text style={styles.skillText}>{skills.tools.join(" • ")}</Text>
            </View>
          </View>
        </View>

        {/* Education & Projects */}
        <View style={{ flexDirection: 'row', gap: 30, marginBottom: 15 }}>
          <View style={{ flex: 1.2 }}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.eduGrid}>
              <Text style={styles.eduTitle}>{education.degree}</Text>
              <Text style={styles.companyDate}>{education.dates}</Text>
            </View>
            <Text style={[styles.skillText, { fontWeight: 'bold' }]}>{education.school}</Text>
            <View style={{ marginTop: 4 }}>
              <Text style={styles.gpa}>GPA: {education.gpa}</Text>
            </View>
            <Text style={[styles.skillText, { fontSize: 8, marginTop: 4, color: '#9ca3af' }]}>
              {education.details}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {projects.slice(0, 4).map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectName}>• {project.name}</Text>
                <Text style={styles.projectDesc}>{project.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements & Volunteering</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {achievements.map((item, index) => (
                <View key={index} style={{ width: '48%', marginBottom: 4, borderBottomWidth: 0.5, borderBottomColor: '#f3f4f6', paddingBottom: 2 }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#111827' }}>{item.title}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 }}>
                    <Text style={{ fontSize: 8, color: '#78350f', fontWeight: 'bold' }}>{item.role.toUpperCase()}</Text>
                    <Text style={{ fontSize: 8, color: '#9ca3af' }}>{item.year}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFDocument;
